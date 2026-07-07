import { SocialProfile } from '../../components/SocialProfiles';
import { content } from '../../data/content';
import { ImageObject } from '../../types';

interface HeroSectionQueryResult {
    allHeroJson: {
        sections: {
            description: string;
            email: string;
            image: ImageObject;
            intro: string;
            heroPhoto: ImageObject;
            socialProfiles: {
                from: SocialProfile[];
                showIcons: boolean;
            };
            calendly: {
                label: string;
                username: string;
                colorText: string;
                colorButton: string;
            };
            cta: {
                label: string;
                url: string;
            };
            subtitle: {
                highlight: string;
                prefix: string;
                suffix: string;
            };
            title: string;
        }[];
    };
}

export const useLocalDataSource = (): HeroSectionQueryResult => {
    return { allHeroJson: { sections: [content.hero] } } as unknown as HeroSectionQueryResult;
};
