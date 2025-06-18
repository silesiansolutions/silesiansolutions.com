import React from 'react';
import { Link } from 'gatsby';
import { Animation } from '../../components/Animation';
import { Section } from '../../components/Section';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Button, ButtonType } from '../../components/Button';
import { PageSection } from '../../types';
import { useLocalDataSource } from './data';
import * as classes from './style.module.css';

export function InterestsSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const data = response.allInterestsJson.sections[0];
    const shouldShowButton = data.button.visible !== false;
    const initiallyShownInterests = data.button.initiallyShownInterests ?? 5;
    const [shownInterests, setShownInterests] = React.useState<number>(
        shouldShowButton ? initiallyShownInterests : data.interests.length,
    );

    function loadMoreHandler() {
        setShownInterests(data.interests.length);
    }

    return (
        <Animation type="fadeUp">
            <Section anchor={props.sectionId} heading={props.heading}>
                <div className={classes.Interests}>
                    {data.interests.slice(0, shownInterests).map((interest, key) => {
                        const interestContent = (
                            <>
                                {interest.image.src && (
                                    <GatsbyImage
                                        image={interest.image.src.childImageSharp.gatsbyImageData}
                                        className={classes.Icon}
                                        alt={interest.image.alt || `Ikona usługi ${interest.label}`}
                                    />
                                )}{' '}
                                {interest.label}
                            </>
                        );

                        return (
                            <Animation key={key} type="scaleIn" delay={key * 50}>
                                {interest.slug ? (
                                    <Link
                                        to={`/oferta/${interest.slug}`}
                                        className={classes.Interest}
                                        aria-label={`Zobacz szczegóły oferty: ${interest.label}`}
                                    >
                                        {interestContent}
                                    </Link>
                                ) : (
                                    <div className={classes.Interest}>{interestContent}</div>
                                )}
                            </Animation>
                        );
                    })}
                    {shouldShowButton && shownInterests < data.interests.length && (
                        <Animation type="scaleIn" delay={(shownInterests + 1) * 50}>
                            <Button
                                type={ButtonType.BUTTON}
                                onClickHandler={loadMoreHandler}
                                label={data.button.label}
                            />
                        </Animation>
                    )}
                </div>
            </Section>
        </Animation>
    );
}
