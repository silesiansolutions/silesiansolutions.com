module.exports = {
    plugins: [
        {
            resolve: 'gatsby-theme-portfolio-minimal',
            options: {
                siteUrl: 'https://silesiansolutions.com/', // Used for sitemap generation
                manifestSettings: {
                    favicon: './content/images/silesiansolutions.jpg', // Path is relative to the root
                    siteName: 'Silesian Solutions - Śląskie Rozwiązania', // Used in manifest.json
                    shortName: 'Silesian Solutions', // Used in manifest.json
                    startUrl: '/', // Used in manifest.json
                    backgroundColor: '#FFFFFF', // Used in manifest.json
                    themeColor: '#000000', // Used in manifest.json
                    display: 'minimal-ui', // Used in manifest.json
                },
                contentDirectory: './content',
                blogSettings: {
                    path: '/blog', // Defines the slug for the blog listing page
                    usePathPrefixForArticles: true, // Default true (i.e. path will be /blog/first-article)
                },
                googleAnalytics: {
                    trackingId: 'G-G5YJ419MXF',
                    anonymize: false, // Default true
                    environments: ['production', 'development'], // Default ["production"]
                },
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'data',
                path: `${__dirname}/src/data`,
            },
        },
        'gatsby-transformer-json',
    ],
};
