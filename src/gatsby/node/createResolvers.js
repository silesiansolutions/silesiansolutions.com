const path = require(`path`);
const fs = require(`fs-extra`);
const svgToMiniDataURI = require('mini-svg-data-uri');
const { optimize } = require('svgo');

module.exports = async ({ createResolvers, store, reporter }) => {
    const { default: PQueue } = await import('p-queue');

    createResolvers({
        ArticleMarkdown: {
            body: { resolve: parentResolverPassthrough('html') },
        },
        File: {
            svg: {
                type: 'InlineSvg',
                resolve: async (source) => await resolveSvgToInlineSvg({ source, store, reporter, PQueue }),
            },
        },
    });
};

function parentResolverPassthrough(field, defaultValue) {
    return async function (source, args, context, info) {
        const fieldName = field || info.fieldName;
        const parentNode = context.nodeModel.getNodeById({ id: source.parent });
        const schemaType = info.schema.getType(parentNode.internal.type);
        const resolver = schemaType.getFields()[fieldName].resolve;
        const result = await resolver(parentNode, args, context, { fieldName });
        return result || defaultValue;
    };
}

async function resolveSvgToInlineSvg({ source, store, reporter, PQueue }) {
    const { absolutePath } = source;

    // Ensure to process only svgs
    if (source.internal.mediaType !== 'image/svg+xml') {
        return null;
    }

    return queueSVG({ absolutePath, store, reporter, PQueue });
}

async function queueSVG({ absolutePath, store, reporter, PQueue }) {
    return PQueue.add(async () => {
        try {
            return await processSVG({ absolutePath, store, reporter });
        } catch (err) {
            reporter.panic(err);
            return null;
        }
    });
}

async function processSVG({ absolutePath, store, reporter }) {
    const svg = await fs.readFile(absolutePath, 'utf8');

    if (svg.indexOf('base64') !== -1) {
        reporter.info(`${absolutePath}:\nSVG contains pixel data. Pixel data was removed to avoid file size bloat.`);
    }

    const result = optimize(svg.toString(), {
        path: absolutePath,
        multipass: true,
        floatPrecision: 2,
        plugins: [
            {
                name: 'preset-default',
                params: {
                    overrides: {
                        removeViewBox: false,
                    },
                },
            },
            'cleanupListOfValues',
            'prefixIds',
            'removeDimensions',
            'removeOffCanvasPaths',
            'removeRasterImages',
            'removeScriptElement',
            'convertStyleToAttrs',
            'removeStyleElement',
            'reusePaths',
            'sortAttrs',
        ],
    });

    if ('data' in result) {
        const dataURI = svgToMiniDataURI(result.data);
        const directory = store.getState().program.directory;

        return {
            content: result.data,
            originalContent: svg,
            dataURI,
            absolutePath,
            relativePath: path.relative(directory, absolutePath),
        };
    }

    if ('modernError' in result) {
        console.error(result.error);
        throw result.modernError;
    }

    throw new Error(`SVGO returned an invalid result:\n${JSON.stringify(result, null, 2)}`);
}
