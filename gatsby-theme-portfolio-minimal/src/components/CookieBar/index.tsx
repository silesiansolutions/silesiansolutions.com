import React from 'react';
import CookieConsent from 'react-cookie-consent';
import Cookies from 'js-cookie';
import { initializeAndTrack } from 'gatsby-plugin-gdpr-cookies';
import { useLocation } from '@reach/router';
import { Animation } from '../Animation';
import './style.css'; // Uses the class names from the original package
import * as classes from './style.module.css';

export function CookieBar(): React.ReactElement {
    const location = useLocation();

    return (
        <Animation className={classes.CookieBar} type="fadeUp" delay={1000}>
            <CookieConsent
                cookieName="gatsby-gdpr-google-analytics"
                buttonId="confirm"
                buttonText="Akceptuj"
                declineButtonId="decline"
                declineButtonText="Odrzuć"
                enableDeclineButton={true}
                disableStyles={true}
                onAccept={() => initializeAndTrack(location)}
            >
                <p className={classes.CookieTitle}>Szanujemy Twoją prywatność</p>
                <p className={classes.CookieText}>
                    Pliki cookie wykorzystujemy, aby poprawić komfort przeglądania, wyświetlać reklamy i treści
                    dopasowane do Twoich preferencji oraz analizować ruch na stronie. Kliknięcie „Akceptuj” oznacza
                    wyrażenie zgody na korzystanie z plików cookie.
                </p>
            </CookieConsent>
        </Animation>
    );
}

export function EnsureActivatedTrackingCookie() {
    const location = useLocation();

    React.useEffect(() => {
        const configured = Cookies.get('portfolio-minimal-ga-configured');
        const enabled = Cookies.get('gatsby-gdpr-google-analytics');

        if (configured !== 'true') return;
        if (configured === 'true' && enabled === 'true') return;

        try {
            Cookies.set('gatsby-gdpr-google-analytics', 'true');
            initializeAndTrack(location);
        } catch {
            Cookies.remove('gatsby-gdpr-google-analytics');
            console.warn('Could not initialize Google Analytics');
        }
    }, []);

    return null;
}
