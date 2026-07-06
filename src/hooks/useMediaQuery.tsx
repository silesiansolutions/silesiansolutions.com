import React from 'react';

export function useMediaQuery(query: string, callback?: (isMatch: boolean) => void): boolean {
    const [match, setMatch] = React.useState<boolean>(false);
    const callbackRef = React.useRef(callback);

    React.useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    React.useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
            return;
        }

        const mediaQuery = window.matchMedia(query);

        function handleMatch() {
            setMatch(mediaQuery.matches);
            callbackRef.current?.(mediaQuery.matches);
        }

        handleMatch();

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleMatch);
            return () => mediaQuery.removeEventListener('change', handleMatch);
        } else {
            // backwards compatibility
            // https://betterprogramming.pub/using-window-matchmedia-in-react-8116eada2588
            mediaQuery.addListener(handleMatch);
            return () => mediaQuery.removeListener(handleMatch);
        }
    }, [query]);

    return match;
}
