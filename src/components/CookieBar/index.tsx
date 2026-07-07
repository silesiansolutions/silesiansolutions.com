import React from 'react';
import Cookies from 'js-cookie';
import { initializeAndTrack } from '../../lib/analytics';
import { Animation } from '../Animation';
import './style.css'; // Uses the class names from the original package
import classes from './style.module.css';

export function CookieBar(): React.ReactElement {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        const consent = Cookies.get('gatsby-gdpr-google-analytics');
        setVisible(consent === undefined);
        if (consent === 'true') initializeAndTrack();
    }, []);

    const choose = (accepted: boolean) => {
        Cookies.set('gatsby-gdpr-google-analytics', String(accepted), { expires: 365, sameSite: 'lax' });
        if (accepted) initializeAndTrack();
        setVisible(false);
    };

    if (!visible) return <></>;

    return (
        <Animation className={classes.CookieBar} type="fadeUp" delay={1000}>
            <div className="CookieConsent" role="dialog" aria-label="Zgoda na pliki cookie">
                <div>
                    <p className={classes.CookieTitle}>Szanujemy Twoją prywatność</p>
                    <p className={classes.CookieText}>
                        Pliki cookie wykorzystujemy, aby poprawić komfort przeglądania, wyświetlać reklamy i treści
                        dopasowane do Twoich preferencji oraz analizować ruch na stronie. Kliknięcie „Akceptuj” oznacza
                        wyrażenie zgody na korzystanie z plików cookie.
                    </p>
                </div>
                <div>
                    <button id="decline" type="button" onClick={() => choose(false)}>
                        Odrzuć
                    </button>
                    <button id="confirm" type="button" onClick={() => choose(true)}>
                        Akceptuj
                    </button>
                </div>
            </div>
        </Animation>
    );
}

export function EnsureActivatedTrackingCookie() {
    React.useEffect(() => {
        const configured = Cookies.get('portfolio-minimal-ga-configured');
        const enabled = Cookies.get('gatsby-gdpr-google-analytics');

        if (configured !== 'true') return;
        if (configured === 'true' && enabled === 'true') return;

        try {
            Cookies.set('gatsby-gdpr-google-analytics', 'true');
            initializeAndTrack();
        } catch {
            Cookies.remove('gatsby-gdpr-google-analytics');
            console.warn('Could not initialize Google Analytics');
        }
    }, []);

    return null;
}
