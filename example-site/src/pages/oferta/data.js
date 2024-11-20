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

export default () => null;
