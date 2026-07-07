import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const source = path.join(root, 'dist/404.html');
const destination = path.join(root, 'dist/404/index.html');

if (!fs.existsSync(source)) throw new Error('Astro did not generate dist/404.html.');
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.copyFileSync(source, destination);
