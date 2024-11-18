import React from 'react';
import { InterestsSection, ProjectsSection, Page, Seo } from 'gatsby-theme-portfolio-minimal';
import { ContactSection } from 'gatsby-theme-portfolio-minimal';

export default function ProjectsPage() {
    return (
        <>
            <Seo title="Nasze wybrane realizacje" useTitleTemplate={true} />
            <Page>
                <ProjectsSection sectionId="realizacje" heading="Przykłady naszych projektów" />
                <InterestsSection sectionId="oferta" heading="Nasze specjalizacje" />
                <ContactSection sectionId="kontakt" heading="Pozostajemy do Twojej dyspozycji" />
            </Page>
        </>
    );
}
