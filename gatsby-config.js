module.exports = {
    siteMetadata: {
        siteUrl: 'https://silesiansolutions.com',
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                defaults: {
                    quality: 100,
                    placeholder: 'blurred',
                },
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `content`,
                path: `./content`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 660,
                            showCaptions: ['title'],
                            markdownCaptions: true,
                            withWebp: true,
                            linkImagesToOriginal: false,
                            backgroundColor: 'transparent',
                        },
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            // Class prefix for <pre> tags containing syntax highlighting;
                            // defaults to 'language-' (e.g. <pre class="language-js">).
                            classPrefix: 'language-',
                            // This is used to allow setting a language for inline code
                            // (i.e. single backticks) by creating a separator.
                            inlineCodeMarker: null,
                            // This lets you set up language aliases.  For example,
                            // setting this to '{ sh: "bash" }'
                            aliases: {},
                            // This toggles the display of line numbers globally alongside the code.
                            // To use it, add the following line in gatsby-browser.js
                            // right after importing the prism color scheme:
                            //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
                            // Defaults to false.
                            // If you wish to only show line numbers on certain code blocks,
                            // leave false and use the {numberLines: true} syntax below
                            showLineNumbers: false,
                            // By default the HTML entities <>&'" are escaped.
                            // Add additional HTML escapes by providing a mapping
                            // of HTML entities and their escape value IE: { '}': '&#123;' }
                            escapeEntities: {},
                        },
                    },
                ],
            },
        },
        `gatsby-plugin-robots-txt`,
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'Silesian Solutions - Śląskie Rozwiązania',
                short_name: 'Silesian Solutions',
                start_url: '/',
                background_color: '#FFFFFF',
                theme_color: '#000000',
                display: 'minimal-ui',
                icon: './content/images/silesiansolutions.jpg',
            },
        },
        {
            resolve: `gatsby-plugin-gdpr-cookies`,
            options: {
                googleAnalytics: {
                    trackingId: 'G-G5YJ419MXF',
                    cookieName: 'gatsby-gdpr-google-analytics',
                    anonymize: false,
                },
                environments: ['production', 'development'],
            },
        },
    ],
};
