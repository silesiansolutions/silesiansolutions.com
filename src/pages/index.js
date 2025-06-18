import React from 'react';
import { JsonLd } from 'react-schemaorg';
import {
    AboutSection,
    ArticlesSection,
    ContactSection,
    HeroSection,
    InterestsSection,
    Page,
    ProjectsSection,
    Seo,
} from '../sections';
import { useSiteMetadata } from '../hooks/useSiteMetadata';
import { createBreadcrumb } from '../utils/organizationHelpers';

export default function IndexPage() {
    const { siteUrl, title, description } = useSiteMetadata();

    const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description: description,
        url: siteUrl,
        isPartOf: {
            '@type': 'WebSite',
            name: 'Silesian Solutions',
            url: siteUrl,
        },
        primaryImageOfPage: {
            '@type': 'ImageObject',
            url: `${siteUrl}/images/silesiansolutions.jpg`,
        },
        breadcrumb: createBreadcrumb([
            {
                name: 'Strona główna',
                url: siteUrl,
            },
        ]),
    };

    return (
        <>
            <Seo title={title} description={description} />
            <JsonLd item={webPageSchema} />
            <Page useSplashScreenAnimation>
                <HeroSection sectionId="hero" />
                <AboutSection sectionId="o-nas" heading="Kim jesteśmy?" />
                <InterestsSection sectionId="oferta" heading="Czym się zajmujemy?" />
                <ProjectsSection
                    sectionId="realizacje"
                    heading="Przykładowe realizacje i projekty"
                    maxVisibleProjects={3}
                />
                <ArticlesSection
                    sectionId="artykuly"
                    heading="Najnowsze artykuły o IT i technologii"
                    sources={['blog']}
                />
                <ContactSection sectionId="kontakt" heading="Skontaktuj się z nami" />
            </Page>
        </>
    );
}
