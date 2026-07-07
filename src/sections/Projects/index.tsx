import React from 'react';
import { Animation } from '../../components/Animation';
import { Section } from '../../components/Section';
import { Slider } from '../../components/Slider';
import { Button, ButtonType } from '../../components/Button';
import { Project } from '../../components/Project';
import { PageSection } from '../../types';
import { useLocalDataSource } from './data';
import classes from './style.module.css';

export function ProjectsSection(props: PageSection & { maxVisibleProjects: number }): React.ReactElement {
    const response = useLocalDataSource();
    const data = response.allProjectsJson.sections[0];
    const visibleProjects = data.projects.filter((project) => project.visible);

    return (
        <Animation type="fadeUp" delay={300}>
            <Section anchor={props.sectionId} heading={props.heading} headingLevel={props.headingLevel} id={props.id}>
                <Slider additionalClasses={[classes.Projects]}>
                    {visibleProjects
                        .slice(0, props.maxVisibleProjects ?? visibleProjects.length)
                        .map((project, key) => (
                            <Project key={key} index={key} data={project} />
                        ))}
                </Slider>
                {data.button !== undefined && data.button.visible !== false && data.button.url && (
                    <Animation className={classes.MoreProjects} type="fadeIn">
                        <Button
                            type={ButtonType.LINK}
                            externalLink={true}
                            url={data.button.url}
                            label={data.button.label}
                        />
                    </Animation>
                )}
            </Section>
        </Animation>
    );
}
