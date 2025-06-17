const ProjectTemplateQuery = `
    query ProjectTemplateQuery {
        allProjectsJson {
            sections: nodes {
                projects {
                    slug
                    visible
                    category
                    title
                    description
                    tags
                    image {
                        alt
                        linkTo
                        src {
                            childImageSharp {
                                gatsbyImageData(width: 800)
                            }
                        }
                        objectFit
                    }
                    links {
                        type
                        url
                    }
                }
            }
        }
    }
`;

module.exports = {
    ProjectTemplateQuery,
};
