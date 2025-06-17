import React from 'react';
import { InterestsSection, ProjectsSection, Page, Seo, ContactSection } from '../sections';

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
