import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Animation } from '../Animation';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Icon } from '../Icon';
import { ImageObject } from '../../types';
import { getExternalLinkRel } from '../../utils/linkUtils';
import * as classes from './style.module.css';

enum LinkType {
    External = 'external',
    Github = 'github',
}

export interface Project {
    slug: string;
    category?: string;
    title: string;
    description: string;
    image: ImageObject & { linkTo?: string };
    tags?: string[];
    links?: {
        type: LinkType;
        url: string;
    }[];
    visible: boolean;
}

interface ProjectProps {
    data: Project;
    index: number;
}

export function Project(props: ProjectProps): React.ReactElement {
    const isDesktopBreakpoint = useMediaQuery('(min-width: 992px)');

    return (
        <Animation
            type="fadeUp"
            className={classes.Project}
            style={{
                flexDirection: isDesktopBreakpoint && props.index % 2 === 0 ? 'row-reverse' : undefined,
            }}
        >
            <div className={classes.Details}>
                <span className={classes.Category}>{props.data.category}</span>
                <h4 className={classes.Title}>{props.data.title}</h4>
                <p>{props.data.description}</p>
                <div className={classes.Tags}>
                    {props.data.tags &&
                        props.data.tags.length !== 0 &&
                        props.data.tags.map((tag, key) => {
                            return (
                                <span key={key}>
                                    <u>{tag}</u>
                                </span>
                            );
                        })}
                </div>
                <div className={classes.Links}>
                    {props.data.slug && (
                        <Link
                            to={`/realizacje/${props.data.slug}`}
                            className={classes.ViewProjectLink}
                            aria-label="Zobacz projekt"
                        >
                            <Icon name="internal" color="var(--subtext-color)" />
                        </Link>
                    )}
                    {props.data.links &&
                        props.data.links.length !== 0 &&
                        props.data.links.map((link, key) => {
                            return (
                                // eslint-disable-next-line react/jsx-no-target-blank
                                <a
                                    key={key}
                                    href={link.url}
                                    target="_blank"
                                    rel={getExternalLinkRel(link.url)}
                                    aria-label="Zewnętrzny link"
                                >
                                    <Icon name={link.type} color="var(--subtext-color)" />
                                </a>
                            );
                        })}
                </div>
            </div>
            {props.data.image.src && props.data.image.linkTo && (
                // eslint-disable-next-line react/jsx-no-target-blank
                <a
                    href={props.data.image.linkTo}
                    target="_blank"
                    rel={getExternalLinkRel(props.data.image.linkTo)}
                    aria-label="Link zewnętrzny"
                >
                    <GatsbyImage
                        className={classes.ProjectImageWrapper}
                        imgClassName={classes.ProjectImage}
                        objectFit={props.data.image.objectFit}
                        image={props.data.image.src.childImageSharp.gatsbyImageData}
                        alt={props.data.image.alt || `Zdjęcie projektu ${props.data.title}`}
                    />
                </a>
            )}
            {props.data.image.src && !props.data.image.linkTo && (
                <GatsbyImage
                    className={classes.ProjectImageWrapper}
                    imgClassName={classes.ProjectImage}
                    objectFit={props.data.image.objectFit}
                    image={props.data.image.src.childImageSharp.gatsbyImageData}
                    alt={props.data.image.alt || `Zdjęcie projektu ${props.data.title}`}
                />
            )}
        </Animation>
    );
}
