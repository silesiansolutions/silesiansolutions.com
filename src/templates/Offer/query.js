const OfferTemplateQuery = `
    query OfferTemplateQuery {
        allOfferJson {
            offers: nodes {
                slug
                heading
                content
                description
                detailedContent
                technologies
                benefits
                examples
                image {
                    alt
                    src {
                        childImageSharp {
                            gatsbyImageData(width: 800)
                        }
                    }
                    objectFit
                }
            }
        }
    }
`;

module.exports = {
    OfferTemplateQuery,
};
