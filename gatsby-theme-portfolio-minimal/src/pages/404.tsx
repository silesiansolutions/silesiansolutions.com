import React from 'react';
import { Page } from '../components/Page';
import { Section } from '../components/Section';
import { Seo } from '../components/Seo';

export default function NotFoundPage(): React.ReactElement {
    return (
        <>
            <Seo title="404: Nie znaleziono strony" noIndex={true} />
            <Page>
                <Section heading="Nie znaleziono strony" anchor="404">
                    <p>Przepraszamy, ale strona, której szukasz, nie istnieje.</p>
                </Section>
            </Page>
        </>
    );
}
