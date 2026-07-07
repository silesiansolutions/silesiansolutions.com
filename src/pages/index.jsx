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
import { useOrganizationData } from '../hooks/useOrganizationData';
import { createBreadcrumb } from '../utils/organizationHelpers';
import { getPageSeoData, createSeoTitle } from '../utils/seoHelpers';

export default function IndexPage() {
    const { siteUrl, titleTemplate } = useSiteMetadata();
    const organizationData = useOrganizationData();
    const seoData = getPageSeoData('home');

    const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: createSeoTitle(seoData.seoTitle, titleTemplate),
        description: seoData.description,
        url: siteUrl,
        mainContentOfPage: {
            '@id': '#main-content',
        },
        isPartOf: {
            '@type': 'WebSite',
            name: organizationData.name,
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
            <Seo title={seoData.seoTitle} description={seoData.description} useTitleTemplate={true} />
            <JsonLd item={webPageSchema} />
            <Page useSplashScreenAnimation id="main-content">
                <HeroSection sectionId="hero" />
                <AboutSection sectionId="o-nas" heading="Kim jesteśmy?" id="about-section" />
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
