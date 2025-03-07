import React from 'react';
import { LegalSection, Page, Seo } from 'gatsby-theme-portfolio-minimal';

export default function InformationClausePage() {
    return (
        <>
            <Seo title="Klauzula informacyjna" useTitleTemplate={true} noIndex={true} />
            <Page>
                <LegalSection sectionId="information-clause" heading="Klauzula informacyjna" />
            </Page>
        </>
    );
}
