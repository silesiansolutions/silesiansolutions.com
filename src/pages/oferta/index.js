import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { Page, Seo, ContactSection, Animation, Section, ProjectsSection, Icon } from '../../sections';
import * as classes from './style.module.css';

const useLocalDataSource = () => {
    const data = useStaticQuery(graphql`
        query {
            allOfferJson {
                nodes {
                    slug
                    heading
                    content
                    description
                }
            }
        }
    `);

    return data;
};

export default function OfferPage() {
    const { allOfferJson } = useLocalDataSource();

    return (
        <>
            <Seo title="Rozwiązania IT dostosowane do Twoich potrzeb" useTitleTemplate={true} />
            <Page>
                <Animation type="fadeUp" delay={300}>
                    <Section heading="Rozwiązania IT, które wspierają Twój biznes" anchor="oferta">
                        {allOfferJson.nodes.map((item, index) => (
                            <div key={index}>
                                {item.slug ? (
                                    <Link
                                        to={`/oferta/${item.slug}`}
                                        className={classes.offerItem}
                                        aria-label={`Zobacz szczegóły oferty: ${item.heading}`}
                                    >
                                        <h3 className={classes.offerHeading}>{item.heading}</h3>
                                        <p className={classes.offerContent}>{item.content}</p>
                                    </Link>
                                ) : (
                                    <div className={classes.offerItem}>
                                        <h3 className={classes.offerHeading}>{item.heading}</h3>
                                        <p className={classes.offerContent}>{item.content}</p>
                                    </div>
                                )}
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
