import { content } from '../../data/content';
import { ImageObject } from '../../types';

interface InterestsSectionQueryResult {
    allInterestsJson: {
        sections: {
            button: {
                initiallyShownInterests: number;
                label: string;
                visible: boolean;
            };
            interests: {
                image: ImageObject;
                label: string;
                slug?: string;
            }[];
        }[];
    };
}

export const useLocalDataSource = (): InterestsSectionQueryResult => {
    return { allInterestsJson: { sections: [content.interests] } } as InterestsSectionQueryResult;
};
