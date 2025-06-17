import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Page, Seo, ContactSection, InterestsSection, Animation, Section } from '../../sections';
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

    return (
        <>
            <Seo title="Tworzymy technologię, która wspiera rozwój biznesu" useTitleTemplate={true} />
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
