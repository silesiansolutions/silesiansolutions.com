import { content } from '../../data/content';

interface LegalSection {
    html: string;
    frontmatter: {
        sectionId: string;
    };
}

export interface LegalSectionQueryResult {
    allLegalSection: {
        sections: LegalSection[];
    };
}

export const useLocalDataSource = (): LegalSectionQueryResult => {
    return { allLegalSection: { sections: content.legalDocuments } } as LegalSectionQueryResult;
};

export const getSectionBySectionId = (res: LegalSectionQueryResult, id: string): LegalSection => {
    const sectionList = res.allLegalSection.sections.filter((section) => section.frontmatter.sectionId === id);
    if (sectionList.length === 0) {
        throw new Error(`Could not find section ${id} by id.`);
    } else if (sectionList.length > 1) {
        throw new Error(`Found section ${id} multiple times. Make sure the id is unique.`);
    } else {
        return sectionList[0];
    }
};
