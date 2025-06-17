import React from 'react';
import { JsonLd } from 'react-schemaorg';
import { SiteNavigationElement, WithContext } from 'schema-dts';

import { Logo } from '../Logo';
import { Link } from '../Link';
import { Theme, useGlobalState } from '../../context';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import { useSiteConfiguration } from '../../hooks/useSiteConfiguration';
import * as classes from './style.module.css';

export function Footer(): React.ReactElement {
    const { globalState } = useGlobalState();
    const siteConfiguration = useSiteConfiguration();
    const darkModeEnabled = globalState.theme === Theme.Dark;
    const { siteUrl } = useSiteMetadata();

    const structuredData: WithContext<SiteNavigationElement> = {
        '@context': 'https://schema.org',
        '@type': 'SiteNavigationElement',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': siteUrl,
        },
        about: siteConfiguration.navigation.footer.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'WebPage',
                url: `${siteUrl}${item.url}`,
                name: item.label,
            },
        })),
    };

    return (
        <footer
            className={classes.Footer}
            style={{
                background: darkModeEnabled ? 'var(--background-color)' : 'var(--primary-color)',
                borderTop: darkModeEnabled ? '3px solid var(--box-shadow-hover-color)' : undefined,
            }}
        >
            <div className={classes.ContentWrapper}>
                <JsonLd<SiteNavigationElement> item={structuredData} />
                <Link to="/" aria-label="home">
                    <Logo
                        fontSize="1.5rem"
                        color={darkModeEnabled ? 'var(--primary-color)' : 'var(--background-color)'}
                        theme={Theme.Dark}
                    />
                </Link>
                <div className={classes.Links}>
                    {siteConfiguration.navigation.footer.map((linkObject, key) => {
                        return (
                            <Link
                                key={key}
                                to={linkObject.url}
                                aria-label={linkObject.label}
                                style={{ color: darkModeEnabled ? 'var(--primary-color)' : 'var(--background-color)' }}
                            >
                                {linkObject.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </footer>
    );
}
