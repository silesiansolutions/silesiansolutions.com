import React from 'react';
import { JsonLd } from 'react-schemaorg';
import { LegalSection, Page, Seo } from '../sections';
import { useSiteMetadata } from '../hooks/useSiteMetadata';
import { useJsonLdOptions } from '../hooks/useOrganizationData';
import { createSimpleBreadcrumb } from '../utils/organizationHelpers';

export default function InformationClausePage() {
    const { siteUrl } = useSiteMetadata();
    const jsonLdOptions = useJsonLdOptions();

    const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Klauzula informacyjna - Silesian Solutions',
        description: 'Klauzula informacyjna dotycząca przetwarzania danych osobowych zgodnie z RODO.',
        url: `${siteUrl}/klauzula-informacyjna`,
        breadcrumb: createSimpleBreadcrumb(
            siteUrl,
            'Klauzula informacyjna',
            `${siteUrl}/klauzula-informacyjna`,
            jsonLdOptions,
        ),
    };

    return (
        <>
            <Seo title="Klauzula informacyjna" useTitleTemplate={true} noIndex={true} />
            <JsonLd item={webPageSchema} />
            <Page>
                <LegalSection sectionId="information-clause" heading="Klauzula informacyjna" />
            </Page>
        </>
    );
}
