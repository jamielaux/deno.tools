import { get, del, head, patch, post, put } from './router.js';

Deno.test(`[get] should set matched flag where request is a GET request`, async () => {
  let match = false;
  const req = { method: 'GET', url: '/' };

  await get(req, '/', async () => {
    match = true;
  });

  if (!match) {
    throw new Error(`get fn should be invoked, where {method: ${req.method}, path: ${req.url}}`);
  }
});

Deno.test(`[delete] should set matched flag where request is a DELETE request`, async () => {
  let match = false;
  const req = { method: 'DELETE', url: '/' };

  await del(req, '/', async () => {
    match = true;
  });

  if (!match) {
    throw new Error(`delete fn should be invoked, where {method: ${req.method}, path: ${req.url}}`);
  }
});

Deno.test(`[head] should set matched flag where request is a HEAD request`, async () => {
  let match = false;
  const req = { method: 'HEAD', url: '/' };

  await head(req, '/', async () => {
    match = true;
  });

  if (!match) {
    throw new Error(`head fn should be invoked, where {method: ${req.method}, path: ${req.url}}`);
  }
});

Deno.test(`[patch] should set matched flag where request is a PATCH request`, async () => {
  let match = false;
  const req = { method: 'PATCH', url: '/' };

  await patch(req, '/', async () => {
    match = true;
  });

  if (!match) {
    throw new Error(`patch fn should be invoked, where {method: ${req.method}, path: ${req.url}}`);
  }
});

Deno.test(`[post] should set matched flag where request is a POST request`, async () => {
  let match = false;
  const req = { method: 'POST', url: '/' };

  await post(req, '/', async () => {
    match = true;
  });

  if (!match) {
    throw new Error(`post fn should be invoked, where {method: ${req.method}, path: ${req.url}}`);
  }
});

Deno.test(`[put] should set matched flag where request is a PUT request`, async () => {
  let match = false;
  const req = { method: 'PUT', url: '/' };

  await put(req, '/', async () => {
    match = true;
  });

  if (!match) {
    throw new Error(`put fn should be invoked, where {method: ${req.method}, path: ${req.url}}`);
  }
});

Deno.test(`[any] should return named param if path matches`, async () => {
  let match = '';
  const req = { method: 'GET', url: '/named-param' };

  await get(req, '/:id', async (params) => {
    match = params.id;
  });

  if (match !== 'named-param') {
    throw new Error(`expect match to equal 'named-param' where {method: ${req.method}, path: ${req.url}}`);
  }
});

Deno.test(`[any] should return 2nd named param if path matches`, async () => {
  let match = '';
  const req = { method: 'GET', url: '/named-param/2nd-param' };

  await get(req, '/:id/:id2', async (params) => {
    match = params.id2;
  });

  if (match !== '2nd-param') {
    throw new Error(`expect match to equal '2nd-param' where {method: ${req.method}, path: ${req.url}}`);
  }
});

Deno.test(`[any] should not match with named params it won't match`, async () => {
  let match = false;
  const req = { method: 'GET', url: '/do-not-match' };

  await get(req, '/nomatch/:id', async (params) => {
    match = true;
  });

  if (match) {
    throw new Error(`expect bot to match where {method: ${req.method}, path: ${req.url}}`);
  }
});
