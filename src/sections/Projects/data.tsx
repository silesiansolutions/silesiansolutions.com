import { Project } from '../../components/Project';
import { content } from '../../data/content';

interface ProjectsSectionQueryResult {
    allProjectsJson: {
        sections: {
            button: {
                label: string;
                url: string;
                visible: boolean;
            };
            projects: Project[];
        }[];
    };
}

export const useLocalDataSource = (): ProjectsSectionQueryResult => {
    return { allProjectsJson: { sections: [content.projectsListing] } } as ProjectsSectionQueryResult;
};
