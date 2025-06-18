/**
 * Determines if a URL should have nofollow attribute
 * @param url - The URL to check
 * @returns true if the link should have nofollow, false otherwise
 */
export function shouldHaveNofollow(url: string): boolean {
    if (url.includes('cyberkatalog.pl')) {
        return false;
    }

    // All other external links should have nofollow
    return true;
}

/**
 * Generates appropriate rel attribute for external links
 * @param url - The URL to check
 * @returns rel attribute string that always includes 'noopener noreferrer'
 */
export function getExternalLinkRel(url: string): 'noopener noreferrer' | 'noopener noreferrer nofollow' {
    const baseRel = 'noopener noreferrer' as const;
    return shouldHaveNofollow(url) ? (`${baseRel} nofollow` as const) : baseRel;
}
