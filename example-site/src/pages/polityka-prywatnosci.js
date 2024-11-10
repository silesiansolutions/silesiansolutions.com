import React from 'react';
import { LegalSection, Page, Seo } from 'gatsby-theme-portfolio-minimal';

export default function PrivacyPage() {
    return (
        <>
            <Seo title="Polityka Prywatności" useTitleTemplate={true} noIndex={true} />
            <Page>
                <LegalSection sectionId="polityka-prywatnosci" heading="Polityka Prywatności" />
            </Page>
        </>
    );
}
