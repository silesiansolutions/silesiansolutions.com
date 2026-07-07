import React from 'react';
import { ContentImage } from '../ContentImage';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import classes from './style.module.css';

export function AuthorSnippet(): React.ReactElement {
    const { author, avatar, bio } = useSiteMetadata();
    return (
        <div className={classes.AuthorSnippet}>
            {avatar?.childImageSharp?.gatsbyImageData ? (
                <ContentImage image={avatar.childImageSharp.gatsbyImageData} alt={author} className={classes.Avatar} />
            ) : null}
            <div className={classes.Description}>
                <span className={classes.WrittenBy}>
                    <u>{author}</u>
                </span>
                <p className={classes.Bio}>{bio}</p>
            </div>
        </div>
    );
}
