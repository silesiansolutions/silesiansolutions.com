import assert from 'node:assert/strict';
import test from 'node:test';
import { expectedRoutes } from './routes.mjs';

test('migration preserves the Gatsby route contract', () => {
    const routes = expectedRoutes();
    assert.equal(routes.length, 44);
    assert.equal(new Set(routes).size, routes.length);
    assert.ok(routes.includes('/'));
    assert.ok(routes.includes('/404.html'));
    assert.ok(routes.includes('/404/'));
    assert.equal(routes.filter((route) => route.startsWith('/blog/')).length, 11);
    assert.equal(routes.filter((route) => route.startsWith('/oferta/')).length, 16);
    assert.equal(routes.filter((route) => route.startsWith('/realizacje/')).length, 10);
});
