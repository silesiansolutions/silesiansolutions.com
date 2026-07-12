import fs from 'node:fs';
import path from 'node:path';

export const IMAGE_EXTENSIONS = ['.webp', '.png', '.jpg', '.jpeg', '.avif', '.gif'];
export const IMAGE_SIZE_LIMIT = 500_000;
export const DEFAULT_SIZE_LIMIT = 1_000_000;

function limitForFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext) ? IMAGE_SIZE_LIMIT : DEFAULT_SIZE_LIMIT;
}

function walk(dir, files) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(fullPath, files);
        } else if (entry.isFile()) {
            files.push(fullPath);
        }
    }
}

export function findOversizedFiles(rootDir) {
    const files = [];
    walk(rootDir, files);

    const violations = [];
    for (const fullPath of files) {
        const size = fs.statSync(fullPath).size;
        const limit = limitForFile(fullPath);
        if (size > limit) {
            violations.push({
                file: path.relative(rootDir, fullPath),
                size,
                limit,
            });
        }
    }

    return violations.sort((a, b) => a.file.localeCompare(b.file));
}
