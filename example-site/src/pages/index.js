import React from 'react';
import {
    AboutSection,
    ArticlesSection,
    ContactSection,
    HeroSection,
    InterestsSection,
    Page,
    ProjectsSection,
    Seo,
} from 'gatsby-theme-portfolio-minimal';

export default function IndexPage() {
    return (
        <>
            <Seo title="Silesian Solutions" />
            <Page useSplashScreenAnimation>
                <HeroSection sectionId="hero" />
                <AboutSection sectionId="o-nas" heading="Kim jesteśmy?" />
                <InterestsSection sectionId="oferta" heading="Czym się zajmujemy?" />
                <ProjectsSection sectionId="realizacje" heading="Przykładowe realizacje i projekty" maxVisibleProjects={3} />
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
