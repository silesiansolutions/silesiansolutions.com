import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ORIGIN = 'https://silesiansolutions.com';
const ORGANIZATION_ID = `${ORIGIN}/#organization`;
const WEBSITE_ID = `${ORIGIN}/#website`;
const dist = path.resolve(import.meta.dirname, '../../dist');

function htmlFiles(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const fullPath = path.join(directory, entry.name);
        if (entry.isDirectory()) return htmlFiles(fullPath);
        return entry.name.endsWith('.html') ? [fullPath] : [];
    });
}

function jsonLdBlocks(html, page) {
    return [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
        (match, index) => {
            try {
                return JSON.parse(match[1]);
            } catch (error) {
                assert.fail(`${page}: JSON-LD block ${index + 1} is invalid (${error.message})`);
            }
        },
    );
}

function topLevelNodes(blocks) {
    return blocks.flatMap((block) => {
        if (Array.isArray(block)) return block;
        if (Array.isArray(block?.['@graph'])) return block['@graph'];
        return [block];
    });
}

function types(node) {
    return Array.isArray(node?.['@type']) ? node['@type'] : [node?.['@type']].filter(Boolean);
}

function canonicalFrom(html, page) {
    const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1];
    assert.ok(canonical, `${page}: missing canonical URL`);
    assert.equal(new URL(canonical).origin, ORIGIN, `${page}: canonical URL uses a foreign origin`);
    return canonical;
}

function validateBreadcrumb(breadcrumb, page) {
    const items = breadcrumb.itemListElement;
    assert.ok(Array.isArray(items) && items.length >= 2, `${page}: BreadcrumbList must contain at least two items`);
    items.forEach((item, index) => {
        assert.equal(item['@type'], 'ListItem', `${page}: breadcrumb ${index + 1} must be a ListItem`);
        assert.equal(item.position, index + 1, `${page}: breadcrumb positions must be contiguous`);
        assert.ok(item.name, `${page}: breadcrumb ${index + 1} is missing name`);
        if (index < items.length - 1) {
            assert.equal(new URL(item.item).origin, ORIGIN, `${page}: breadcrumb item must be an absolute site URL`);
        }
    });
}

assert.ok(fs.existsSync(dist), `Build output not found at ${dist}. Run pnpm build first.`);

let articleCount = 0;
let serviceCount = 0;

for (const file of htmlFiles(dist)) {
    const page = path.relative(dist, file);
    const html = fs.readFileSync(file, 'utf8');
    const canonical = canonicalFrom(html, page);
    const blocks = jsonLdBlocks(html, page);
    const nodes = topLevelNodes(blocks);

    assert.ok(nodes.length > 0, `${page}: missing JSON-LD`);

    for (const node of nodes) {
        if (typeof node?.['@id'] === 'string' && URL.canParse(node['@id'])) {
            const idUrl = new URL(node['@id']);
            if (idUrl.origin === ORIGIN) {
                assert.ok(!idUrl.pathname.includes('//'), `${page}: malformed @id ${node['@id']}`);
            }
        }
    }

    const organization = nodes.find((node) => types(node).includes('ProfessionalService'));
    const website = nodes.find((node) => types(node).includes('WebSite'));
    const webpage = nodes.find((node) => types(node).some((type) => type.endsWith('Page')));

    assert.equal(organization?.['@id'], ORGANIZATION_ID, `${page}: missing canonical ProfessionalService node`);
    assert.equal(organization?.legalName, 'Dawid Ryłko', `${page}: incorrect legal business name`);
    assert.ok(organization?.address?.streetAddress, `${page}: business address is incomplete`);
    assert.ok(organization?.logo?.url, `${page}: organization logo is missing`);
    assert.ok(organization?.founder?.name, `${page}: organization founder is missing`);
    assert.equal(website?.['@id'], WEBSITE_ID, `${page}: missing canonical WebSite node`);
    assert.equal(website?.publisher?.['@id'], ORGANIZATION_ID, `${page}: WebSite publisher is inconsistent`);
    assert.equal(webpage?.['@id'], `${canonical}#webpage`, `${page}: WebPage @id must derive from canonical URL`);
    assert.equal(webpage?.url, canonical, `${page}: WebPage URL differs from canonical URL`);

    if (webpage?.breadcrumb) validateBreadcrumb(webpage.breadcrumb, page);
    if (canonical === `${ORIGIN}/`)
        assert.equal(webpage?.breadcrumb, undefined, 'Homepage must not emit one-item breadcrumbs');

    const article = nodes.find((node) => types(node).includes('BlogPosting'));
    if (article) {
        articleCount += 1;
        assert.match(article.datePublished ?? '', /^\d{4}-\d{2}-\d{2}/, `${page}: datePublished must be ISO 8601`);
        assert.equal(
            article.author?.['@id'],
            ORGANIZATION_ID,
            `${page}: article author must reference the organization`,
        );
        assert.equal(article.publisher?.['@id'], ORGANIZATION_ID, `${page}: article publisher is inconsistent`);
        assert.equal(
            article.mainEntityOfPage?.['@id'],
            `${canonical}#webpage`,
            `${page}: article page reference is inconsistent`,
        );
        assert.equal(article.url, canonical, `${page}: article URL differs from canonical URL`);
        assert.ok(
            article.headline && !article.headline.includes('| Silesian Solutions'),
            `${page}: headline is not the article title`,
        );
        assert.ok(article.image?.url, `${page}: article image is missing`);
    }

    const services = nodes.filter((node) => types(node).includes('Service'));
    for (const service of services) {
        serviceCount += 1;
        assert.equal(new URL(service.url).origin, ORIGIN, `${page}: Service URL must be an absolute site URL`);
        assert.equal(service.provider?.['@id'], ORGANIZATION_ID, `${page}: Service provider is inconsistent`);
        if (service.offers) {
            assert.equal(service.offers.seller?.['@id'], ORGANIZATION_ID, `${page}: Offer seller is inconsistent`);
        }
    }
    if (new URL(canonical).pathname.startsWith('/oferta/') && canonical !== `${ORIGIN}/oferta/`) {
        assert.ok(
            services.some((service) => service.url === canonical),
            `${page}: detail page is missing its canonical Service`,
        );
    }
}

assert.ok(articleCount > 0, 'No BlogPosting structured data found in the production build');
assert.ok(serviceCount > 0, 'No Service structured data found in the production build');
console.log(`Structured-data contract passed (${articleCount} articles, ${serviceCount} services).`);
