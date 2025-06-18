/**
 * Returns the plural of a Polish word for certain common words.
 * Falls back to adding 's' for unknown words.
 *
 * @export
 * @param {string} word
 * @param {number} [amount]
 * @returns {string}
 */
export function pluralize(word?: string, amount?: number): string | undefined {
    if (!word) return undefined;

    if (amount !== undefined && amount === 1) {
        return word;
    }

    // Polish plural forms for common words
    const polishPlural: { [key: string]: string } = {
        artykuł: 'artykuły',
        projekt: 'projekty',
        usługa: 'usługi',
        realizacja: 'realizacje',
        oferta: 'oferty',
        strona: 'strony',
        aplikacja: 'aplikacje',
        blog: 'blogi',
        wpis: 'wpisy',
        tekst: 'teksty',
        artykuły: 'artykuły', // already plural
        projekty: 'projekty', // already plural
        usługi: 'usługi', // already plural
        realizacje: 'realizacje', // already plural
        oferty: 'oferty', // already plural
        strony: 'strony', // already plural
        aplikacje: 'aplikacje', // already plural
        blogi: 'blogi', // already plural
        wpisy: 'wpisy', // already plural
        teksty: 'teksty', // already plural
    };

    const lowerWord = word.toLowerCase();

    // Check for known Polish words
    if (polishPlural[lowerWord]) {
        return polishPlural[lowerWord];
    }

    // Fallback - return the word as is (many Polish words don't change in plural in certain contexts)
    return word;
}
