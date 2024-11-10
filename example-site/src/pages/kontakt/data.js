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
