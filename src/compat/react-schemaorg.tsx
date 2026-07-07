import React from 'react';

const centrallyManagedTypes = new Set([
    'Article',
    'AboutPage',
    'CollectionPage',
    'ContactPage',
    'LocalBusiness',
    'Organization',
    'ProfessionalService',
    'SiteNavigationElement',
    'WebPage',
    'WebSite',
]);

export function JsonLd<T>({ item }: { item: T }): React.ReactElement | null {
    const typedItem = item as { '@type'?: string | string[] };
    const types = Array.isArray(typedItem['@type']) ? typedItem['@type'] : [typedItem['@type']];
    if (types.some((type) => type && centrallyManagedTypes.has(type))) return null;
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />;
}
