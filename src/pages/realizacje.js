import React from 'react';
import { JsonLd } from 'react-schemaorg';
import { InterestsSection, ProjectsSection, Page, Seo, ContactSection } from '../sections';
import { useSiteMetadata } from '../hooks/useSiteMetadata';
import { useJsonLdOptions } from '../hooks/useOrganizationData';
import { createSimpleBreadcrumb } from '../utils/organizationHelpers';

export default function ProjectsPage() {
    const { siteUrl } = useSiteMetadata();
    const jsonLdOptions = useJsonLdOptions();

    const collectionPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Realizacje - Nasze projekty IT - Silesian Solutions',
        description:
            'Poznaj nasze wybrane realizacje i projekty IT. Portfolio Silesian Solutions z przykładami aplikacji webowych, stron internetowych i rozwiązań technologicznych.',
        url: `${siteUrl}/realizacje`,
        mainContentOfPage: {
            '@id': '#projects-content',
        },
        breadcrumb: createSimpleBreadcrumb(siteUrl, 'Realizacje', `${siteUrl}/realizacje`, jsonLdOptions),
    };

    return (
        <>
            <Seo title="Nasze wybrane realizacje" useTitleTemplate={true} />
            <JsonLd item={collectionPageSchema} />
            <Page>
                <ProjectsSection sectionId="realizacje" heading="Przykłady naszych projektów" id="projects-content" />
                <InterestsSection sectionId="oferta" heading="Nasze specjalizacje" />
                <ContactSection sectionId="kontakt" heading="Pozostajemy do Twojej dyspozycji" />
            </Page>
        </>
    );
}
