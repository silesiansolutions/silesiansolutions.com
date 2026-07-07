const trackingId = 'G-G5YJ419MXF';

export function initializeAndTrack(): void {
    if (typeof document === 'undefined' || document.querySelector(`script[data-analytics-id="${trackingId}"]`)) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    script.dataset.analyticsId = trackingId;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    const gtag = (...args: unknown[]) => window.dataLayer.push(args);
    gtag('js', new Date());
    gtag('config', trackingId, { anonymize_ip: true });
}

declare global {
    interface Window {
        dataLayer: unknown[];
    }
}
