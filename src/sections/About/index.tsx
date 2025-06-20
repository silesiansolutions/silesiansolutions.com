import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Animation } from '../../components/Animation';
import { Section } from '../../components/Section';
import { useLocalDataSource } from './data';
import { PageSection } from '../../types';
import * as classes from './style.module.css';

export function AboutSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const data = response.allAboutMarkdown.sections[0];

    return (
        <Animation type="fadeUp" delay={900}>
            <Section anchor={props.sectionId} heading={props.heading} id={props.id}>
                <div className={classes.About}>
                    <div className={classes.Description} dangerouslySetInnerHTML={{ __html: data.html }} />
                    {data.frontmatter.imageSrc && (
                        <Animation type="fadeLeft" delay={1200}>
                            <div className={classes.ImageWrapper}>
                                <GatsbyImage
                                    image={data.frontmatter.imageSrc.childImageSharp.gatsbyImageData}
                                    className={classes.Image}
                                    alt={data.frontmatter.imageAlt || `Zdjęcie sekcji o nas`}
                                />
                            </div>
                        </Animation>
                    )}
                </div>
            </Section>
        </Animation>
    );
}
