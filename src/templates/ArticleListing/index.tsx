import React from 'react';
import { JsonLd } from 'react-schemaorg';
import { Blog, WithContext } from 'schema-dts';

import { Page } from '../../components/Page';
import { Section } from '../../components/Section';
import { Seo } from '../../components/Seo';
import { Slider } from '../../components/Slider';
import { ArticleCard } from '../../components/ArticleCard';
import { Button, ButtonType } from '../../components/Button';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import { ArticleTemplateData } from '../Article/data';
import { getPageSeoData } from '../../utils/seoHelpers';
import * as classes from './style.module.css';
import { pluralize } from '../../utils/pluralize';

interface ArticleListingTemplateProps {
    pageContext: {
        articles: ArticleTemplateData[];
        entityName?: string;
    };
}

interface FilterOption {
    label: string;
    selected: boolean;
    relatedArticleIds: string[];
}

export default function ArticleListingTemplate(props: ArticleListingTemplateProps): React.ReactElement {
    const ARTICLES_PER_PAGE = 9;
    const articles = props.pageContext.articles;
    const [filterOptions, setFilterOptions] = React.useState<FilterOption[]>(extractFilterOptions(articles));
    const [shownArticlesNumber, setShownArticlesNumber] = React.useState<number>(ARTICLES_PER_PAGE);
    const { siteUrl } = useSiteMetadata();
    const seoData = getPageSeoData('blog');

    function handleFilterOptionClick(optionLabel: string): void {
        const updatedFilterOptions = [...filterOptions];
        const selectedOptionIndex = updatedFilterOptions.map((o) => o.label).indexOf(optionLabel);
        updatedFilterOptions[selectedOptionIndex].selected = !updatedFilterOptions[selectedOptionIndex].selected;
        setFilterOptions(updatedFilterOptions);
    }

    // Check if at least one filter option is selected. If so, create an array of all article ids that
    // are selected based on the current filter option selection. We use this later on to easily check
    // which articles to show.
    let selectedArticleIds: string[] = [];
    const filterSelected = filterOptions.map((o) => o.selected).indexOf(true) !== -1;
    if (filterSelected) {
        selectedArticleIds = filterOptions
            .filter((option) => option.selected) // Filter only for selected options
            .map((option) => option.relatedArticleIds) // Create an array of article ids arrays
            .flat(1) // Flatten the array to a string[]
            .filter((id, index, arr) => arr.indexOf(id) === index); // Remove duplicate article ids
    }

    const entities = pluralize(props.pageContext.entityName) ?? 'Artykuły';
    const structuredData: WithContext<Blog> = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        headline: entities,
        mainEntityOfPage: {
            '@id': '#articles-listing',
        },
        blogPost: articles.map((article) => {
            return {
                '@type': 'BlogPosting',
                headline: article.title,
                url: `${siteUrl}${article.slug}`,
                datePublished: article.date,
                dateModified: article.date,
                image: {
                    '@type': 'ImageObject',
                    url: article.banner.src?.childImageSharp?.gatsbyImageData?.images?.fallback?.src ?? '',
                    caption: article.banner.caption ?? '',
                },
            };
        }),
    };

    return (
        <>
            <Seo title={seoData.seoTitle} description={seoData.description} useTitleTemplate={true} />
            <Page>
                <Section anchor="articleListing" heading={entities} id="articles-listing">
                    <JsonLd<Blog> item={structuredData} />
                    <div className={classes.Filter}>
                        Zaznacz kategorie, aby filtrować {entities.toLocaleLowerCase()}
                        <Slider additionalClasses={[classes.Options]}>
                            {filterOptions.map((option, key) => {
                                return (
                                    <div
                                        key={key}
                                        role="button"
                                        onClick={() => handleFilterOptionClick(option.label)}
                                        className={[
                                            classes.Option,
                                            option.selected === true ? classes.Selected : null,
                                        ].join(' ')}
                                    >
                                        {option.label} ({option.relatedArticleIds.length})
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                    <div className={classes.Listing}>
                        {articles
                            .filter((article) => !filterSelected || selectedArticleIds.includes(article.id))
                            .slice(0, shownArticlesNumber)
                            .map((article, key) => {
                                return (
                                    <ArticleCard
                                        key={key}
                                        showBanner={true}
                                        data={{
                                            image: article.banner,
                                            title: article.title,
                                            category: article.categories.join(' / '),
                                            publishedAt: new Date(article.date.replace(/-/g, '/')),
                                            link: article.slug,
                                            readingTime: article.readingTime.text,
                                        }}
                                    />
                                );
                            })}
                    </div>
                    {(filterSelected && selectedArticleIds.length > shownArticlesNumber) ||
                    (!filterSelected && articles.length > shownArticlesNumber) ? (
                        <div className={classes.LoadMore}>
                            <Button
                                type={ButtonType.BUTTON}
                                label="Załaduj więcej"
                                onClickHandler={() => setShownArticlesNumber((prev) => prev + 6)}
                            />
                        </div>
                    ) : null}
                </Section>
            </Page>
        </>
    );
}

// Helper function to calculate a sorted array of filter options based on the given articles
// We use the helper function before we initialize the state so that it can happen on the server.
function extractFilterOptions(articles: ArticleTemplateData[]): FilterOption[] {
    const filterOptions: FilterOption[] = [];
    const categoryList: string[] = [];
    articles.forEach((article) => {
        article.categories.forEach((category) => {
            if (!categoryList.includes(category)) {
                filterOptions.push({ label: category, selected: false, relatedArticleIds: [article.id] });
                categoryList.push(category);
            } else {
                const optionIndex = filterOptions.map((o) => o.label).indexOf(category);
                filterOptions[optionIndex].relatedArticleIds.push(article.id);
            }
        });
    });
    return filterOptions.sort((a, b) => (a.relatedArticleIds.length > b.relatedArticleIds.length ? -1 : 1));
}
