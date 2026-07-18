import type { APIRoute } from 'astro';
import { content } from '../../src/data/content';

const RECENT_ARTICLES = 12;

const stripLeadingSymbols = (text: string): string => text.replace(/^[^\p{L}\p{N}]+/u, '').trim();

const note = (text: string, max = 160): string => {
    const clean = text.replace(/\s+/g, ' ').trim();
    if (clean.length <= max) return clean;
    const slice = clean.slice(0, max);
    const trimmed = slice.slice(0, slice.lastIndexOf(' '));
    return `${(trimmed || slice).trimEnd()}…`;
};

export const GET: APIRoute = () => {
    const { siteMetadata, organizationData, offers, projects, articles } = content;
    const url = (path: string): string => `${siteMetadata.siteUrl}${path}`;
    const list = (items: string[]): string => items.join('\n');

    const services = offers.map(
        (offer) =>
            `- [${stripLeadingSymbols(offer.heading)}](${url(`/oferta/${offer.slug}/`)}) — ${note(offer.description)}`,
    );

    const realizations = projects
        .filter((project) => project.visible)
        .map(
            (project) => `- [${project.title}](${url(`/realizacje/${project.slug}/`)}) — ${note(project.description)}`,
        );

    const posts = articles.slice(0, RECENT_ARTICLES).map((article) => `- [${article.title}](${url(article.slug)})`);

    const body = `# ${organizationData.name}

> ${organizationData.description}

${siteMetadata.description}

## Oferta

- [Pełna oferta usług](${url('/oferta/')}) — software engineering, AI, automatyzacja, chmura i cyberbezpieczeństwo.
${list(services)}

## Realizacje

- [Wszystkie realizacje](${url('/realizacje/')}) — wybrane projekty i case studies.
${list(realizations)}

## Blog

- [Blog](${url('/blog/')}) — artykuły o AI, software engineeringu, automatyzacji i trendach technologicznych.
${list(posts)}

## O nas

- [O nas](${url('/o-nas/')}) — misja, wartości i sposób pracy zespołu ${organizationData.name}.

## Kontakt

- [Kontakt](${url('/kontakt/')}) — dane kontaktowe, lokalizacja i godziny otwarcia biura w Bielsku-Białej.
- E-mail: ${organizationData.email}
`;

    return new Response(body, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
};
