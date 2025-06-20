import React from 'react';
import { Animation } from '../../components/Animation';
import { Section } from '../../components/Section';
import { PageSection } from '../../types';
import { getSectionBySectionId, useLocalDataSource } from './data';

export function LegalSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const data = getSectionBySectionId(response, props.sectionId);

    return (
        <Animation type="fadeUp" delay={300}>
            <Section anchor={props.sectionId} heading={props.heading} id={props.id}>
                <div dangerouslySetInnerHTML={{ __html: data.html }} />
            </Section>
        </Animation>
    );
}
