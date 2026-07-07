import React from 'react';
import { SiteNavigationElement, WithContext } from 'schema-dts';

import { JsonLd } from '../JsonLd';
import { Logo } from '../Logo';
import { Link } from '../Link';
import { Animation } from '../Animation';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import { useSiteConfiguration } from '../../hooks/useSiteConfiguration';
import classes from './style.module.css';

export function Header(): React.ReactElement {
    const [open, setOpen] = React.useState<boolean>(false);
    const siteConfiguration = useSiteConfiguration();
    const isDesktopBreakpoint = useMediaQuery('(min-width: 992px)');
    const { siteUrl } = useSiteMetadata();

    React.useEffect(() => {
        document.body.classList.toggle(classes.Blurred, open);
        return () => document.body.classList.remove(classes.Blurred);
    }, [open]);

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
            <button
                type="button"
                className={classes.Burger}
                onClick={() => setOpen(!open)}
                aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
                aria-expanded={open}
                aria-controls="mobile-navigation"
            >
                <div style={open ? { transform: 'rotate(45deg)' } : undefined} />
                <div style={open ? { transform: 'translateX(20px)', opacity: 0 } : undefined} />
                <div style={open ? { transform: 'rotate(-45deg)' } : undefined} />
            </button>
            <div
                id="mobile-navigation"
                className={classes.SideBarWrapper}
                style={open ? { transform: 'translateX(0)', visibility: 'visible' } : undefined}
                aria-hidden={!open}
                tabIndex={open ? 1 : -1}
            >
                <nav className={classes.SideNavigationBar}>{navigationItems}</nav>
            </div>
            <button
                type="button"
                className={classes.SideBarBackdrop}
                style={open ? { display: 'block' } : undefined}
                onClick={() => setOpen(false)}
                aria-label="Zamknij menu"
                tabIndex={open ? 0 : -1}
            />
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
