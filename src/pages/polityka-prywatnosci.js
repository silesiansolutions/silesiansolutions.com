import React from 'react';
import { LegalSection, Page, Seo } from '../sections';

export default function PrivacyPage() {
    return (
        <>
            <Seo title="Polityka Prywatności" useTitleTemplate={true} noIndex={true} />
            <Page>
                <LegalSection sectionId="privacy-policy" heading="Polityka Prywatności" />
            </Page>
        </>
    );
}
