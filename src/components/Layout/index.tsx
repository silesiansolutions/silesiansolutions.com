import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import '../../globalStyles/global.css';
import '../../globalStyles/theme.css';
import React, { useEffect, useState } from 'react';
import { Theme, useGlobalState } from '../../context';
import { SplashScreen } from '../SplashScreen';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { CookieBar, EnsureActivatedTrackingCookie } from '../CookieBar';
import classes from './style.module.css';

interface LayoutProps {
    children: React.ReactElement;
    useSplashScreenAnimation: boolean;
    useCookieBar: boolean;
}

export function Layout(props: LayoutProps): React.ReactElement {
    const { globalState } = useGlobalState();
    const [isInternalNavigation, setIsInternalNavigation] = useState<boolean>(false);

    const showSplashScreen = !isInternalNavigation && props.useSplashScreenAnimation && !globalState.splashScreenDone;
    const darkModeEnabled = globalState.theme === Theme.Dark;

    useEffect(() => {
        const referrer = document.referrer ? new URL(document.referrer) : null;
        setIsInternalNavigation(referrer?.origin === window.location.origin);
    }, []);

    useEffect(() => {
        document.body.setAttribute('data-theme', darkModeEnabled ? Theme.Dark : Theme.Light);
    }, [darkModeEnabled]);

    const splashScreenView = <SplashScreen />;

    const layoutView = (
        <div className={classes.Layout}>
            <Header />
            <main>{props.children}</main>
            <Footer />
            {props.useCookieBar ? <CookieBar /> : <EnsureActivatedTrackingCookie />}
        </div>
    );

    return (
        <>
            {layoutView}
            {showSplashScreen && splashScreenView}
        </>
    );
}
