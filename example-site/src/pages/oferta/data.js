import { graphql, useStaticQuery } from 'gatsby';

export const useLocalDataSource = () => {
    const data = useStaticQuery(graphql`
        query {
            allOfferJson {
                nodes {
                    heading
                    content
                }
            }
        }
    `);

    return data;
};

// Add this line to prevent Gatsby from trying to create a page from this file
export default () => null;
