import { JsonLd } from '../../components/JsonLd';
import { content } from '../../data/content';
import { Page, Seo, ContactSection, InterestsSection, Animation, Section } from '../../sections';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import { useOrganizationData, useJsonLdOptions } from '../../hooks/useOrganizationData';
import { createOrganizationReference, createSimpleBreadcrumb } from '../../utils/organizationHelpers';
import { getPageSeoData, createSeoTitle } from '../../utils/seoHelpers';
import classes from './style.module.css';

const useLocalDataSource = () => ({ allAboutUsJson: { nodes: content.aboutUs } });

export default function AboutUsPage() {
    const { allAboutUsJson } = useLocalDataSource();
    const { siteUrl, titleTemplate } = useSiteMetadata();
    const organizationData = useOrganizationData();
    const jsonLdOptions = useJsonLdOptions();
    const seoData = getPageSeoData('about');

    const aboutPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: createSeoTitle(seoData.seoTitle, titleTemplate),
        description: seoData.description,
        url: `${siteUrl}/o-nas/`,
        mainContentOfPage: {
            '@id': '#about-us-content',
        },
        mainEntity: createOrganizationReference(siteUrl, organizationData),
        breadcrumb: createSimpleBreadcrumb(siteUrl, seoData.title, `${siteUrl}/o-nas/`, jsonLdOptions),
    };

    return (
        <>
            <Seo title={seoData.seoTitle} description={seoData.description} useTitleTemplate={true} />
            <JsonLd item={aboutPageSchema} />
            <Page>
                <Animation type="fadeUp" delay={300}>
                    <Section heading="Kim jesteśmy?" headingLevel="h1" anchor="o-nas" id="about-us-content">
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
