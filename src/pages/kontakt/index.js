import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { JsonLd } from 'react-schemaorg';
import { Page, Seo, ContactSection, Section, Animation } from '../../sections';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import { useOrganizationData, useJsonLdOptions } from '../../hooks/useOrganizationData';
import {
    createPostalAddress,
    createGeoCoordinates,
    createOfferCatalog,
    createSimpleBreadcrumb,
    createServiceArea,
} from '../../utils/organizationHelpers';
import { getPageSeoData, createSeoTitle } from '../../utils/seoHelpers';
import * as classes from './style.module.css';

const useLocalDataSource = () => {
    const data = useStaticQuery(graphql`
        query {
            allHoursJson {
                nodes {
                    day
                    hours
                    isOpen
                }
            }
            allFaqJson {
                nodes {
                    question
                    answer
                }
            }
        }
    `);

    return data;
};

export default function ContactPage() {
    const { allHoursJson, allFaqJson } = useLocalDataSource();
    const { siteUrl, titleTemplate } = useSiteMetadata();
    const organizationData = useOrganizationData();
    const jsonLdOptions = useJsonLdOptions();
    const seoData = getPageSeoData('contact');

    function translateDayToEnglish(polishDay) {
        const dayMap = {
            Poniedziałek: 'Monday',
            Wtorek: 'Tuesday',
            Środa: 'Wednesday',
            Czwartek: 'Thursday',
            Piątek: 'Friday',
            Sobota: 'Saturday',
            Niedziela: 'Sunday',
        };
        return dayMap[polishDay] || polishDay;
    }

    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${siteUrl}#organization`,
        mainEntityOfPage: {
            '@id': '#business-info',
        },
        name: organizationData.name,
        description: organizationData.description,
        url: siteUrl,
        email: organizationData.email,
        address: createPostalAddress(organizationData),
        geo: createGeoCoordinates(organizationData),
        openingHoursSpecification: allHoursJson.nodes.map((day) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: translateDayToEnglish(day.day),
            opens: day.isOpen ? day.hours.split(' - ')[0] : undefined,
            closes: day.isOpen ? day.hours.split(' - ')[1] : undefined,
        })),
        areaServed: organizationData.areaServed,
        serviceArea: createServiceArea(organizationData),
        knowsAbout: organizationData.knowsAbout,
        hasOfferCatalog: createOfferCatalog(organizationData, jsonLdOptions),
    };

    const contactPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: createSeoTitle(seoData.seoTitle, titleTemplate),
        description: seoData.description,
        url: `${siteUrl}/kontakt`,
        mainEntity: {
            '@id': `${siteUrl}#organization`,
        },
        breadcrumb: createSimpleBreadcrumb(siteUrl, seoData.title, `${siteUrl}/kontakt`, jsonLdOptions),
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: allFaqJson.nodes.map((item, index) => ({
            '@type': 'Question',
            '@id': `#faq-question-${index}`,
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };

    return (
        <>
            <Seo title={seoData.seoTitle} description={seoData.description} useTitleTemplate={true} />
            <JsonLd item={localBusinessSchema} />
            <JsonLd item={contactPageSchema} />
            <JsonLd item={faqSchema} />
            <Page>
                <ContactSection
                    sectionId="kontakt"
                    heading="Napisz do nas"
                    description="Potrzebujesz wsparcia w realizacji projektu IT? A może szukasz partnera technologicznego, który zrozumie potrzeby Twojego biznesu? Jesteśmy tu, by pomóc. Napisz do nas, zadzwoń lub odwiedź nasze biuro w Bielsku-Białej. Zespół Silesian Solutions z przyjemnością odpowie na Twoje pytania, przedstawi możliwe ścieżki działania i pomoże wybrać rozwiązanie dopasowane do Twoich celów. Bez zbędnego żargonu - konkretnie, rzeczowo i po partnersku."
                    id="contact-info"
                />

                <Animation type="fadeUp" delay={600}>
                    <Section
                        heading="Lokalizacja i godziny otwarcia"
                        anchor="lokalizacja-i-godziny-otwarcia"
                        className={classes.infoSection}
                        id="business-info"
                    >
                        <div className={classes.contactInfo}>
                            <div className={classes.mapContainer}>
                                <iframe
                                    title="Mapa lokalizacji Silesian Solutions w Bielsku-Białej"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d91935.13895122784!2d18.956355192500787!3d49.812143066972546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47169f63dd80507b%3A0x6811f587fa4fe3a7!2sBielsko-Bia%C5%82a!5e1!3m2!1spl!2spl!4v1731248159113!5m2!1spl!2spl"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className={classes.map}
                                ></iframe>
                            </div>
                            <Animation type="fadeLeft" delay={900}>
                                <div className={classes.hours}>
                                    <h3>Godziny otwarcia:</h3>
                                    <table className={classes.hoursTable}>
                                        <tbody>
                                            {allHoursJson.nodes.map((day, index) => (
                                                <tr key={index}>
                                                    <td>{day.day}</td>
                                                    <td
                                                        className={day.isOpen ? classes.openHours : classes.closedHours}
                                                    >
                                                        <u>{day.hours}</u>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Animation>
                        </div>
                    </Section>
                </Animation>

                <Animation type="fadeUp" delay={300}>
                    <Section heading="Podczas rozmowy mogą zostać omówione następujące kwestie" anchor="faq">
                        {allFaqJson.nodes.map((item, index) => (
                            <div key={index} className={classes.faqItem} id={`faq-question-${index}`}>
                                <h3 className={classes.faqQuestion}>{item.question}</h3>
                                <p className={classes.faqAnswer}>{item.answer}</p>
                            </div>
                        ))}
                    </Section>
                </Animation>
            </Page>
        </>
    );
}
