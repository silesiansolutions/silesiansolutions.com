import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { findOversizedFiles } from './size-budget.mjs';

function withTempDir(t, fn) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'size-budget-'));
    t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
    return fn(dir);
}

function writeFileOfSize(filePath, size) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, Buffer.alloc(size));
}

test('flags an oversized image against the image limit', (t) => {
    withTempDir(t, (dir) => {
        writeFileOfSize(path.join(dir, 'oversized.webp'), 500_001);

        const violations = findOversizedFiles(dir);

        assert.equal(violations.length, 1);
        assert.deepEqual(violations[0], { file: 'oversized.webp', size: 500_001, limit: 500_000 });
    });
});

test('flags an oversized non-image against the default limit', (t) => {
    withTempDir(t, (dir) => {
        writeFileOfSize(path.join(dir, 'chunk.js'), 1_000_001);

        const violations = findOversizedFiles(dir);

        assert.equal(violations.length, 1);
        assert.deepEqual(violations[0], { file: 'chunk.js', size: 1_000_001, limit: 1_000_000 });
    });
});

test('files exactly at the limit pass', (t) => {
    withTempDir(t, (dir) => {
        writeFileOfSize(path.join(dir, 'boundary.png'), 500_000);
        writeFileOfSize(path.join(dir, 'boundary.js'), 1_000_000);

        const violations = findOversizedFiles(dir);

        assert.deepEqual(violations, []);
    });
});

test('walks nested directories', (t) => {
    withTempDir(t, (dir) => {
        writeFileOfSize(path.join(dir, '_astro', 'nested', 'deep.webp'), 500_001);

        const violations = findOversizedFiles(dir);

        assert.equal(violations.length, 1);
        assert.deepEqual(violations[0], {
            file: path.join('_astro', 'nested', 'deep.webp'),
            size: 500_001,
            limit: 500_000,
        });
    });
});
