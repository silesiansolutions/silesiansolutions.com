import React from 'react';
import { Page, Seo, ContactSection, InterestsSection, Animation, Section } from 'gatsby-theme-portfolio-minimal';
import * as classes from './style.module.css';
import { useLocalDataSource } from './data';

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
