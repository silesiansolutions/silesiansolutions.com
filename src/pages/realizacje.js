import React from 'react';
import { JsonLd } from 'react-schemaorg';
import { InterestsSection, ProjectsSection, Page, Seo, ContactSection } from '../sections';
import { useSiteMetadata } from '../hooks/useSiteMetadata';
import { useJsonLdOptions } from '../hooks/useOrganizationData';
import { createSimpleBreadcrumb } from '../utils/organizationHelpers';
import { getPageSeoData, createSeoTitle } from '../utils/seoHelpers';

export default function ProjectsPage() {
    const { siteUrl, titleTemplate } = useSiteMetadata();
    const jsonLdOptions = useJsonLdOptions();
    const seoData = getPageSeoData('projects');

    const collectionPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: createSeoTitle(seoData.seoTitle, titleTemplate),
        description: seoData.description,
        url: `${siteUrl}/realizacje`,
        mainContentOfPage: {
            '@id': '#projects-content',
        },
        breadcrumb: createSimpleBreadcrumb(siteUrl, seoData.title, `${siteUrl}/realizacje`, jsonLdOptions),
    };

    return (
        <>
            <Seo title={seoData.seoTitle} description={seoData.description} useTitleTemplate={true} />
            <JsonLd item={collectionPageSchema} />
            <Page>
                <ProjectsSection sectionId="realizacje" heading="Przykłady naszych projektów" id="projects-content" />
                <InterestsSection sectionId="oferta" heading="Nasze specjalizacje" />
                <ContactSection sectionId="kontakt" heading="Pozostajemy do Twojej dyspozycji" />
            </Page>
        </>
    );
}
