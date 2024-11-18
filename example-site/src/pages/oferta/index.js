import React from 'react';
import { Page, Seo, ContactSection, Animation, Section, ProjectsSection } from 'gatsby-theme-portfolio-minimal';
import * as classes from './style.module.css';
import { useLocalDataSource } from './data';

export default function OfferPage() {
    const { allOfferJson } = useLocalDataSource();

    return (
        <>
            <Seo title="Rozwiązania IT dostosowane do Twoich potrzeb" useTitleTemplate={true} />
            <Page>
                <Animation type="fadeUp" delay={300}>
                    <Section heading="Rozwiązania IT, które wspierają Twój biznes" anchor="oferta">
                        {allOfferJson.nodes.map((item, index) => (
                            <div key={index} className={classes.offerItem}>
                                <h3 className={classes.offerHeading}>{item.heading}</h3>
                                <p className={classes.offerContent}>{item.content}</p>
                            </div>
                        ))}
                    </Section>
                </Animation>
                <ProjectsSection sectionId="realizacje" heading="Przykłady naszych wdrożeń" maxVisibleProjects={3} />
                <ContactSection sectionId="kontakt" heading="Zacznijmy współpracę" />
            </Page>
        </>
    );
}
