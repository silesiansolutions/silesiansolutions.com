import React from 'react';

interface SeoProps {
    title: string;
    useTitleTemplate?: boolean;
    noIndex?: boolean;
    description?: string;
    addOrganizationSchema?: boolean;
    addWebSiteSchema?: boolean;
}

export function Seo(_props: SeoProps): React.ReactElement | null {
    return null;
}
