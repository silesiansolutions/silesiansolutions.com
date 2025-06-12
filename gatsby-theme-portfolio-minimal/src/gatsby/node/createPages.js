const path = require('path');
const query = require('../../templates/Article/query');
const projectQuery = require('../../templates/Project/query');

module.exports = async ({ graphql, actions, reporter }, options) => {
    const templateDir = path.join(__dirname, '../', '../', '../', 'src', 'templates');

    const response = await graphql(query.ArticleTemplateQuery);
    const data = response.data;

    if (!data && response.errors) {
        throw new Error(`Error while fetching article data, ${response.errors}`);
    } else if (data.allArticle.articles.length !== 0 && (!options.blogSettings || !options.blogSettings.path)) {
        throw new Error(`No path for ArticleListing page in gatsby-config specified`);
    } else if (data.allArticle.articles.length === 0 && !options.blogSettings) {
        reporter.info('Blog disabled, skipping articles page creation');
        return;
    }

    // Create ArticleListing page
    const articleListingPageSlug = options.blogSettings.path.replace(/\/\/+/g, '/'); // remove duplicate slashes
    reporter.info(`Creating ArticleListing page under ${articleListingPageSlug}`);
    actions.createPage({
        path: articleListingPageSlug,
        component: path.resolve(templateDir, 'ArticleListing', 'index.tsx'),
        context: {
            articles: data.allArticle.articles,
            entityName: options.blogSettings.entityName,
        },
    });

    // Create pages for each individual Article
    data.allArticle.articles.forEach((article) => {
        reporter.info(`Creating Article page under ${article.slug}`);
        actions.createPage({
            path: article.slug,
            component: path.resolve(templateDir, 'Article', 'index.tsx'),
            context: {
                article: article,
                listingPagePath: articleListingPageSlug,
                entityName: options.blogSettings.entityName,
            },
        });
    });

    const projectResponse = await graphql(projectQuery.ProjectTemplateQuery);
    const projectData = projectResponse.data;

    if (!projectData && projectResponse.errors) {
        throw new Error(`Error while fetching project data, ${projectResponse.errors}`);
    } else if (projectData.allProjectsJson.sections.length === 0) {
        reporter.info('No projects found, skipping project page creation');
    } else {
        const allProjects = projectData.allProjectsJson.sections[0].projects.filter(
            (project) => project.visible && project.slug,
        );

        allProjects.forEach((project) => {
            reporter.info(`Creating Project page under /realizacje/${project.slug}`);
            actions.createPage({
                path: `/realizacje/${project.slug}`,
                component: path.resolve(templateDir, 'Project', 'index.tsx'),
                context: {
                    project: project,
                    listingPagePath: '/realizacje',
                    entityName: 'realizacja',
                },
            });
        });
    }
};
