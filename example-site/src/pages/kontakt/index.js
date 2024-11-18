import React from 'react';
import { Page, Seo, ContactSection, Section, Animation } from 'gatsby-theme-portfolio-minimal';
import { useLocalDataSource } from './data';
import * as classes from './style.module.css';

export default function ContactPage() {
    const { allHoursJson, allFaqJson } = useLocalDataSource();

    return (
        <>
            <Seo title="Skontaktuj się z nami" useTitleTemplate={true} />
            <Page>
                <ContactSection
                    sectionId="kontakt"
                    heading="Napisz do nas"
                    description="Jesteśmy do Twojej dyspozycji! Nasz zespół chętnie odpowie na pytania, doradzi i pomoże wybrać najlepsze rozwiązania technologiczne. Możesz się z nami skontaktować przez formularz, telefonicznie lub odwiedzając nas osobiście."
                />

                <Animation type="fadeUp">
                    <Section
                        heading="Lokalizacja i godziny otwarcia"
                        anchor="kontakt-info"
                        className={classes.infoSection}
                    >
                        <div className={classes.contactInfo}>
                            <div className={classes.mapContainer}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d91935.13895122784!2d18.956355192500787!3d49.812143066972546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47169f63dd80507b%3A0x6811f587fa4fe3a7!2sBielsko-Bia%C5%82a!5e1!3m2!1spl!2spl!4v1731248159113!5m2!1spl!2spl"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className={classes.map}
                                ></iframe>
                            </div>
                            <div className={classes.hours}>
                                <h3>Godziny otwarcia:</h3>
                                <table className={classes.hoursTable}>
                                    <tbody>
                                        {allHoursJson.nodes.map((day, index) => (
                                            <tr key={index}>
                                                <td>{day.day}</td>
                                                <td className={day.isOpen ? classes.openHours : classes.closedHours}>
                                                    <u>{day.hours}</u>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Section>
                </Animation>

                <Animation type="fadeUp">
                    <Section heading="Podczas rozmowy mogą zostać omówione następujące kwestie:" anchor="faq">
                        {allFaqJson.nodes.map((item, index) => (
                            <div key={index} className={classes.faqItem}>
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
