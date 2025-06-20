import React from 'react';
import { Helmet } from 'react-helmet';
import { JsonLd } from 'react-schemaorg';
import { SiteNavigationElement, WithContext } from 'schema-dts';

import { Logo } from '../Logo';
import { Link } from '../Link';
import { Animation } from '../Animation';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import { useSiteConfiguration } from '../../hooks/useSiteConfiguration';
import * as classes from './style.module.css';

export function Header(): React.ReactElement {
    const [open, setOpen] = React.useState<boolean>(false);
    const siteConfiguration = useSiteConfiguration();
    const isDesktopBreakpoint = useMediaQuery('(min-width: 992px)');
    const { siteUrl } = useSiteMetadata();

    const navigationItems = (
        <>
            {siteConfiguration.navigation.header.map((linkObject, key) => {
                return (
                    <Link
                        key={key}
                        to={linkObject.url}
                        className={classes.NavLink}
                        onClick={!isDesktopBreakpoint ? () => setOpen(!open) : undefined}
                    >
                        {linkObject.label}
                    </Link>
                );
            })}
            {siteConfiguration.navigation.ctaButton?.url && siteConfiguration.navigation.ctaButton?.label ? (
                <Link
                    to={siteConfiguration.navigation.ctaButton.url}
                    target={siteConfiguration.navigation.ctaButton.openNewTab ? '_blank' : undefined}
                    className={classes.CtaButton}
                    onClick={!isDesktopBreakpoint ? () => setOpen(!open) : undefined}
                >
                    {siteConfiguration.navigation.ctaButton.label}
                </Link>
            ) : null}
        </>
    );

    const sideNavigationBar = (
        <>
            <div className={classes.Burger} onClick={() => setOpen(!open)}>
                <div style={open ? { transform: 'rotate(45deg)' } : undefined} />
                <div style={open ? { transform: 'translateX(20px)', opacity: 0 } : undefined} />
                <div style={open ? { transform: 'rotate(-45deg)' } : undefined} />
            </div>
            <div
                className={classes.SideBarWrapper}
                style={open ? { transform: 'translateX(0)', visibility: 'visible' } : undefined}
                aria-hidden={!open}
                tabIndex={open ? 1 : -1}
            >
                <nav className={classes.SideNavigationBar}>{navigationItems}</nav>
            </div>
            <div className={classes.SideBarBackdrop} style={open ? { display: 'block' } : undefined} />
        </>
    );

    const structuredData: WithContext<SiteNavigationElement> = {
        '@context': 'https://schema.org',
        '@type': 'SiteNavigationElement',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': siteUrl,
        },
        about: siteConfiguration.navigation.header.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'WebPage',
                url: `${siteUrl}${item.url}`,
                name: item.label,
            },
        })),
    };
    const topNavigationBar = <nav className={classes.TopNavigationBar}>{navigationItems}</nav>;

    return (
        <header className={classes.Header}>
            {/* Make background blurry when sidebar is opened */}
            <Helmet bodyAttributes={{ class: open ? classes.Blurred : undefined }} />
            <Animation className={classes.ContentWrapper} type="fadeDown">
                <Link to="/" aria-label="strona główna">
                    <Logo fontSize="2rem" color="var(--primary-color)" />
                </Link>
                <JsonLd<SiteNavigationElement> item={structuredData} />
                {isDesktopBreakpoint ? topNavigationBar : sideNavigationBar}
            </Animation>
        </header>
    );
}
