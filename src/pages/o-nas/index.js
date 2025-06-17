import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { JsonLd } from 'react-schemaorg';
import { Page, Seo, ContactSection, InterestsSection, Animation, Section } from '../../sections';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import {
    ORGANIZATION_DATA,
    createOrganizationReference,
    createSimpleBreadcrumb,
} from '../../constants/organizationData';
import * as classes from './style.module.css';

const useLocalDataSource = () => {
    const data = useStaticQuery(graphql`
        query {
            allAboutUsJson {
                nodes {
                    heading
                    content
                }
            }
        }
    `);

    return data;
};

export default function AboutUsPage() {
    const { allAboutUsJson } = useLocalDataSource();
    const { siteUrl } = useSiteMetadata();

    const aboutPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'O nas - Silesian Solutions',
        description:
            'Poznaj Silesian Solutions - zespół specjalistów IT tworzących nowoczesne rozwiązania technologiczne prosto ze Śląska.',
        url: `${siteUrl}/o-nas`,
        mainEntity: createOrganizationReference(siteUrl),
        breadcrumb: createSimpleBreadcrumb(siteUrl, 'O nas', `${siteUrl}/o-nas`),
    };

    return (
        <>
            <Seo title="Tworzymy technologię, która wspiera rozwój biznesu" useTitleTemplate={true} />
            <JsonLd item={aboutPageSchema} />
            <Page>
                <Animation type="fadeUp" delay={300}>
                    <Section heading="Kim jesteśmy?" anchor="o-nas">
                        {allAboutUsJson.nodes.map((item, index) => (
                            <div key={index} className={classes.aboutUsItem}>
                                <h3 className={classes.aboutUsHeading}>{item.heading}</h3>
                                <p className={classes.aboutUsContent}>{item.content}</p>
                            </div>
                        ))}
                    </Section>
                </Animation>
                <InterestsSection sectionId="oferta" heading="Zobacz w czym możemy Ci pomóc" />
                <ContactSection sectionId="kontakt" heading="Twoje potrzeby są dla nas priorytetem" />
            </Page>
        </>
    );
}
