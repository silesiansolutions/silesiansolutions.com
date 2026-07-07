import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');

export function expectedRoutes() {
    const offers = JSON.parse(fs.readFileSync(path.join(root, 'content/offer.json'), 'utf8'));
    const projects = JSON.parse(fs.readFileSync(path.join(root, 'content/sections/projects/projects.json'), 'utf8'));
    const articleRoot = path.join(root, 'content/articles');
    const articleSlugs = fs
        .readdirSync(articleRoot, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name.replace(/^\d{4}-\d{2}-\d{2}--/, ''));

    return [
        '/',
        '/404.html',
        '/404/',
        '/blog/',
        '/klauzula-informacyjna/',
        '/kontakt/',
        '/o-nas/',
        '/oferta/',
        '/polityka-prywatnosci/',
        '/realizacje/',
        ...articleSlugs.map((slug) => `/blog/${slug}/`),
        ...offers.filter((offer) => offer.slug).map((offer) => `/oferta/${offer.slug}/`),
        ...projects.projects
            .filter((project) => project.visible && project.slug)
            .map((project) => `/realizacje/${project.slug}/`),
    ].sort();
}

export function routeToFile(route, outputDir = path.join(root, 'dist')) {
    if (route === '/') return path.join(outputDir, 'index.html');
    if (route.endsWith('.html')) return path.join(outputDir, route.slice(1));
    return path.join(outputDir, route.slice(1), 'index.html');
}
