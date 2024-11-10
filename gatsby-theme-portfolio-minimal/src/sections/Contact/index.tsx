import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Animation } from '../../components/Animation';
import { Section } from '../../components/Section';
import { SocialProfiles } from '../../components/SocialProfiles';
import { useLocalDataSource } from './data';
import { PageSection } from '../../types';
import * as classes from './style.module.css';

type ContactSectionProps = PageSection & {
    description?: string;
};

export function ContactSection(props: ContactSectionProps): React.ReactElement {
    const response = useLocalDataSource();
    const data = response.allContactJson.sections[0];
    const finalDescription = props.description || data.description;

    return (
        <Animation type="fadeUp">
            <Section anchor={props.sectionId} heading={props.heading} additionalClasses={[classes.Contact]}>
                <div className={classes.Description}>{finalDescription && <p>{finalDescription}</p>}</div>
                <div className={classes.Profile}>
                    {data.image.src && (
                        <GatsbyImage
                            className={classes.Avatar}
                            image={data.image.src.childImageSharp.gatsbyImageData}
                            alt={data.image.alt || `Profile ${data.name}`}
                        />
                    )}
                    <div className={classes.ContactDetails}>
                        <div className={classes.Name}>{data.name}</div>
                        <u>
                            <a href={`mailto:${data.email}`}>{data.email}</a>
                        </u>
                    </div>
                </div>
                {data.socialProfiles && (
                    <SocialProfiles from={data.socialProfiles.from} showIcon={data.socialProfiles.showIcons} />
                )}
            </Section>
        </Animation>
    );
}
