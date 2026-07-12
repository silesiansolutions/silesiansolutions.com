import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { expectedRoutes, routeToFile } from './routes.mjs';
import { findOversizedFiles } from './size-budget.mjs';

const root = path.resolve(import.meta.dirname, '../..');
const dist = path.join(root, 'dist');
const routes = expectedRoutes();
const origin = 'https://silesiansolutions.com';

for (const route of routes) {
    const file = routeToFile(route, dist);
    assert.ok(fs.existsSync(file), `Missing generated route: ${route} (${file})`);
    const html = fs.readFileSync(file, 'utf8');
    assert.match(html, /<html lang="pl">/, `${route}: missing lang=pl`);
    assert.match(html, /<title>[^<]+<\/title>/, `${route}: missing title`);
    assert.match(html, /<meta name="description" content="[^"]+"/, `${route}: missing description`);
    assert.match(
        html,
        /<link rel="canonical" href="https:\/\/silesiansolutions\.com\/[^"]*"/,
        `${route}: missing canonical`,
    );
    assert.match(html, /property="og:title"/, `${route}: missing Open Graph metadata`);
    assert.match(html, /name="twitter:card"/, `${route}: missing Twitter card metadata`);
    assert.match(html, /type="application\/ld\+json"/, `${route}: missing JSON-LD`);

    for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
        const url = new URL(href, origin);
        if (url.origin === origin && url.pathname !== '/' && !url.pathname.split('/').at(-1)?.includes('.')) {
            assert.ok(
                url.pathname.endsWith('/'),
                `${route}: internal link must use its canonical trailing slash: ${href}`,
            );
        }
    }
}

const home = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const jsonLdBlocks = [...home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) =>
    JSON.parse(match[1]),
);
const graph = jsonLdBlocks.find((block) => Array.isArray(block['@graph']))?.['@graph'];
assert.ok(graph, 'Homepage: missing central JSON-LD graph');
const flattenedTypes = graph.flatMap((item) => (Array.isArray(item['@type']) ? item['@type'] : [item['@type']]));
for (const type of ['ProfessionalService', 'WebSite', 'WebPage']) {
    assert.ok(flattenedTypes.includes(type), `Homepage: missing ${type} structured data`);
}

const service = fs.readFileSync(path.join(dist, 'oferta', 'sztuczna-inteligencja-ai', 'index.html'), 'utf8');
assert.match(service, /"@type":"Service"/, 'Offer detail: missing Service JSON-LD');

const article = fs.readFileSync(path.join(dist, 'blog', 'procesory-intel', 'index.html'), 'utf8');
assert.match(article, /"@type":"BlogPosting"/, 'Article detail: missing BlogPosting JSON-LD');

assert.ok(fs.existsSync(path.join(dist, 'manifest.webmanifest')), 'Missing web manifest');
assert.ok(fs.existsSync(path.join(dist, 'robots.txt')), 'Missing robots.txt');
assert.ok(fs.existsSync(path.join(dist, 'sitemap-index.xml')), 'Missing sitemap index');

const sitemap = fs.readFileSync(path.join(dist, 'sitemap-0.xml'), 'utf8');
assert.doesNotMatch(sitemap, /polityka-prywatnosci|klauzula-informacyjna/, 'Legal noindex pages leaked to sitemap');
for (const route of routes.filter(
    (route) => !route.includes('404') && !route.includes('polityka-') && !route.includes('klauzula-'),
)) {
    assert.match(sitemap, new RegExp(`https://silesiansolutions\\.com${route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
}

const robots = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8');
assert.match(robots, /Sitemap: https:\/\/silesiansolutions\.com\/sitemap-index\.xml/);

const sizeViolations = findOversizedFiles(dist);
assert.equal(
    sizeViolations.length,
    0,
    `Size budget exceeded:\n${sizeViolations.map((v) => `${v.file} (${v.size} B > ${v.limit} B)`).join('\n')}`,
);
const scannedFiles = fs.readdirSync(dist, { recursive: true, withFileTypes: true }).filter((entry) => entry.isFile());

console.log(`Build contract passed for ${routes.length} routes.`);
console.log(`Size budget passed (${scannedFiles.length} files scanned).`);
