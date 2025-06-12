import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Page } from '../../components/Page';
import { Seo } from '../../components/Seo';
import { Icon } from '../../components/Icon';
import { Project } from '../../components/Project';
import { pluralize } from '../../utils/pluralize';
import * as classes from './style.module.css';

interface ProjectTemplateProps {
    pageContext: {
        project: Project;
        listingPagePath: string;
        entityName?: string;
    };
}

export default function ProjectTemplate(props: ProjectTemplateProps): React.ReactElement {
    const project = props.pageContext.project;

    return (
        <>
            <Seo title={project.title} description={project.description} useTitleTemplate={true} />
            <Page>
                <article className={classes.Article}>
                    <div className={classes.Breadcrumb}>
                        <Link
                            to={props.pageContext.listingPagePath}
                            title={`Wróć do ${pluralize(props.pageContext.entityName) ?? 'realizacji'}`}
                        >
                            <span className={classes.BackArrow}>&#10094;</span>
                            Wszystkie {pluralize(props.pageContext.entityName) ?? 'realizacje'}
                        </Link>
                    </div>

                    <section className={classes.Header}>
                        {project.category && <span className={classes.Category}>{project.category}</span>}
                        <h1>{project.title}</h1>
                        {project.description && <div className={classes.Description}>{project.description}</div>}
                    </section>

                    {project.image?.src && (
                        <section className={classes.Banner}>
                            <GatsbyImage
                                image={project.image.src.childImageSharp.gatsbyImageData}
                                alt={project.image.alt || `Projekt ${project.title}`}
                                imgClassName={classes.BannerImage}
                            />
                        </section>
                    )}

                    <section className={classes.Body}>
                        {project.tags && project.tags.length > 0 && (
                            <div className={classes.Content}>
                                <h3>Wykorzystane technologie:</h3>
                                <div className={classes.TagsList}>
                                    {project.tags.map((tag, key) => (
                                        <span key={key} className={classes.Keyword}>
                                            <u>{tag}</u>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.links && project.links.length > 0 && (
                            <div className={classes.Content}>
                                <h3>Linki do projektu:</h3>
                                <div className={classes.LinksList}>
                                    {project.links.map((link, key) => (
                                        <a
                                            key={key}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={classes.Link}
                                            aria-label={`Link do ${link.type === 'github' ? 'GitHub' : 'strony projektu'}`}
                                        >
                                            <Icon name={link.type} />
                                            <span>{link.type === 'github' ? 'Zobacz kod' : 'Odwiedź stronę'}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                </article>
            </Page>
        </>
    );
}
