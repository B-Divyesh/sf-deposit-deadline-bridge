import assert from 'node:assert/strict';

const site = process.env.LIVE_URL ?? 'https://deposit-deadline-bridge.sociobot.in';
const api = 'https://api.sociobot.in/api/v1';

async function siteResponse(path) {
  return fetch(`${site}${path}`, { redirect: 'manual' });
}

const home = await siteResponse('/');
assert.equal(home.status, 200, 'home must return HTTP 200');
assert.match(home.headers.get('content-security-policy') ?? '', /style-src 'self'/, 'home must keep its self-only stylesheet policy');
const homeHtml = await home.text();
assert.match(homeHtml, /<title>Deposit Deadline Bridge — preserve payment dates<\/title>/, 'home must identify the product');

const notFound = await siteResponse('/regression-missing-page');
assert.equal(notFound.status, 404, 'unknown routes must return HTTP 404');
assert.match(notFound.headers.get('content-security-policy') ?? '', /style-src 'self'/, '404 must receive the production stylesheet policy');
const notFoundHtml = await notFound.text();
assert.doesNotMatch(notFoundHtml, /<style[\s>]/i, '404 must not use CSP-blocked inline styles');
assert.match(notFoundHtml, /<link rel="stylesheet" href="\/404\.css" \/>/, '404 must use its same-origin stylesheet');
assert.equal((await siteResponse('/404.css')).status, 200, '404 stylesheet must be served');

const catalog = await fetch(`${api}/products`);
assert.equal(catalog.status, 200, 'billing catalog must return HTTP 200');
const catalogBody = await catalog.json();
const product = catalogBody.data.find((entry) => entry.slug === 'deposit-deadline-bridge');
assert.ok(product, 'billing catalog must contain Deposit Deadline Bridge');
assert.equal(product.price_minor, 2400, 'billing catalog must price the full library at $24');
assert.equal(product.currency, 'USD', 'billing catalog must use USD');

const checkout = await fetch(`${api}/products/deposit-deadline-bridge/checkout`, { redirect: 'manual' });
assert.equal(checkout.status, 303, 'checkout must redirect to the hosted payment page');
assert.match(checkout.headers.get('location') ?? '', /^https:\/\/checkout\.dodopayments\.com\/session\//, 'checkout must use Dodo hosted checkout');

const invalidLicense = await fetch(`${api}/products/deposit-deadline-bridge/verify?license=release-regression-invalid-token`);
assert.equal(invalidLicense.status, 200, 'license verification must respond for an invalid token');
assert.equal((await invalidLicense.json()).valid, false, 'an invalid license must not unlock the paid library');

console.log(`Live release checks passed for ${site}`);
