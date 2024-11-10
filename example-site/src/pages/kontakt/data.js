import { graphql, useStaticQuery } from 'gatsby';

export const useLocalDataSource = () => {
    const data = useStaticQuery(graphql`
        query {
            allHoursJson {
                nodes {
                    day
                    hours
                    isOpen
                }
            }
            allFaqJson {
                nodes {
                    question
                    answer
                }
            }
        }
    `);

    return data;
};

// Add this line to prevent Gatsby from trying to create a page from this file
export default () => null;
