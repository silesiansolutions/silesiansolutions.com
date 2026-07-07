import React from 'react';
import classes from './style.module.css';

interface SectionProps {
    anchor: string;
    heading?: string;
    headingLevel?: 'h1' | 'h2' | 'h3';
    additionalClasses?: string[];
    children: React.ReactNode;
    id?: string;
}

export function Section(props: SectionProps): React.ReactElement {
    const Heading = props.headingLevel ?? 'h2';
    let classList;
    if (props.additionalClasses) {
        classList = props.additionalClasses.concat(classes.ContentWrapper).join(' ');
    } else {
        classList = classes.ContentWrapper;
    }
    return (
        <section id={props.anchor} className={classes.Section}>
            <div className={classList} id={props.id}>
                {props.heading && <Heading className={classes.Heading}>{props.heading}</Heading>}
                {props.children}
            </div>
        </section>
    );
}
