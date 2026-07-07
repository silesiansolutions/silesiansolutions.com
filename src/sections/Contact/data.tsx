import { SocialProfile } from '../../components/SocialProfiles';
import { content } from '../../data/content';
import { ImageObject } from '../../types';

interface ContactSectionQueryResult {
    allContactJson: {
        sections: {
            description: string;
            email: string;
            image: ImageObject;
            name: string;
            socialProfiles: {
                from: SocialProfile[];
                showIcons: boolean;
            };
        }[];
    };
}

export const useLocalDataSource = (): ContactSectionQueryResult => {
    return { allContactJson: { sections: [content.contact] } } as ContactSectionQueryResult;
};
