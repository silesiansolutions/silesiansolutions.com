import React from 'react';
import { JsonLd } from 'react-schemaorg';
import { SiteNavigationElement, WithContext } from 'schema-dts';
import { GatsbyImage } from 'gatsby-plugin-image';

import { Link } from '../Link';
import { Icon } from '../Icon';
import { Theme, useGlobalState } from '../../context';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import * as classes from './style.module.css';

export function Footer(): React.ReactElement {
    const { globalState } = useGlobalState();
    const darkModeEnabled = globalState.theme === Theme.Dark;
    const { siteUrl, social, bio, author, avatar } = useSiteMetadata();

    const offerLinks = [
        { label: 'Sztuczna Inteligencja (AI)', url: '/oferta/sztuczna-inteligencja-ai' },
        { label: 'Strony Internetowe', url: '/oferta/strony-internetowe' },
        { label: 'Aplikacje Mobilne', url: '/oferta/aplikacje-mobilne' },
        { label: 'Sklepy Internetowe', url: '/oferta/sklepy-internetowe' },
        { label: 'Systemy Dedykowane', url: '/oferta/systemy-dedykowane' },
        { label: 'Integracje Systemów', url: '/oferta/integracje-systemow' },
        { label: 'Rozwiązania Chmurowe', url: '/oferta/rozwiazania-chmurowe' },
        { label: 'Cyberbezpieczeństwo', url: '/oferta/cyberbezpieczenstwo' },
        { label: 'Analiza Danych', url: '/oferta/analiza-danych' },
        { label: 'Doradztwo IT', url: '/oferta/doradztwo-it' },
        { label: 'Compliance i Audyty IT', url: '/oferta/compliance-i-audyty-it' },
        { label: 'Automatyzacja Procesów', url: '/oferta/automatyzacja-procesow' },
        { label: 'DevOps & CI/CD', url: '/oferta/devops-ci-cd' },
        { label: 'Low-Code & No-Code', url: '/oferta/low-code-no-code' },
        { label: 'Internet of Things (IoT)', url: '/oferta/internet-of-things-iot' },
    ];

    const companyLinks = [
        { label: 'Strona główna', url: '/' },
        { label: 'O nas', url: '/o-nas' },
        { label: 'Realizacje', url: '/realizacje' },
        { label: 'Blog', url: '/blog' },
        { label: 'Kontakt', url: '/kontakt' },
    ];

    const legalLinks = [
        { label: 'Polityka Prywatności', url: '/polityka-prywatnosci' },
        { label: 'Klauzula informacyjna RODO', url: '/klauzula-informacyjna' },
    ];

    const socialLinks = [
        { id: 'linkedin', url: social.linkedin, label: 'LinkedIn' },
        { id: 'twitter', url: social.twitter, label: 'Twitter' },
        { id: 'github', url: social.github, label: 'GitHub' },
    ].filter((link) => link.url);

    const allNavigationLinks = [...companyLinks, ...offerLinks, ...legalLinks];

    const structuredData: WithContext<SiteNavigationElement> = {
        '@context': 'https://schema.org',
        '@type': 'SiteNavigationElement',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': siteUrl,
        },
        about: allNavigationLinks.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'WebPage',
                url: `${siteUrl}${item.url}`,
                name: item.label,
            },
        })),
    };

    const currentYear = new Date().getFullYear();

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

                <div className={classes.LogoSection}>
                    <div className={classes.BrandRow}>
                        <Link to="/" aria-label="strona główna" className={classes.AvatarLink}>
                            {avatar?.childImageSharp?.gatsbyImageData && (
                                <GatsbyImage
                                    className={classes.BrandAvatar}
                                    image={avatar.childImageSharp.gatsbyImageData}
                                    alt={`Logo ${author}`}
                                />
                            )}
                        </Link>
                        <div className={classes.BrandInfo}>
                            <h2 className={classes.BrandName}>{author}</h2>
                            <p className={classes.BrandDescription}>{bio}</p>
                        </div>
                    </div>
                </div>

                <div className={classes.MainSection}>
                    <div className={classes.LinkColumn}>
                        <h3 className={classes.ColumnTitle}>{author}</h3>
                        <ul className={classes.LinkList}>
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.url}
                                        className={classes.FooterLink}
                                        style={{
                                            color: darkModeEnabled ? 'var(--primary-color)' : 'var(--background-color)',
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={classes.LinkColumn}>
                        <h3 className={classes.ColumnTitle}>Informacje Prawne</h3>
                        <ul className={classes.LinkList}>
                            {legalLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.url}
                                        className={classes.FooterLink}
                                        style={{
                                            color: darkModeEnabled ? 'var(--primary-color)' : 'var(--background-color)',
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={classes.LinkColumn}>
                        <h3 className={classes.ColumnTitle}>Znajdź nas</h3>
                        <div className={classes.SocialLinks}>
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    className={classes.SocialLink}
                                    aria-label={social.label}
                                    style={{
                                        color: darkModeEnabled ? 'var(--primary-color)' : 'var(--background-color)',
                                    }}
                                >
                                    <Icon name={social.id} />
                                    <span>{social.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={classes.ServicesSection}>
                    <h3 className={classes.ServicesTitle}>Nasze Usługi</h3>
                    <div className={classes.ServicesList}>
                        <Link
                            to="/oferta"
                            className={classes.ServicesLink}
                            style={{
                                color: darkModeEnabled ? 'var(--primary-color)' : 'var(--background-color)',
                            }}
                        >
                            Wszystkie usługi
                        </Link>
                        {offerLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.url}
                                className={classes.ServicesLink}
                                style={{
                                    color: darkModeEnabled ? 'var(--primary-color)' : 'var(--background-color)',
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className={classes.BottomSection}>
                    <p
                        className={classes.Copyright}
                        style={{ color: darkModeEnabled ? 'var(--subtext-color)' : 'var(--background-color)' }}
                    >
                        Copyright &copy; {currentYear} Silesian Solutions. Wszelkie prawa zastrzeżone.
                    </p>
                </div>
            </div>
        </footer>
    );
}
