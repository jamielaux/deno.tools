import { ServerRequest } from 'https://deno.land/std/http/server.ts';

// regexes borrowed from backbone
const optionalParam = /\((.*?)\)/g;
const namedParam = /(\(\?)?:\w+/g;
const escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
const splatParam = /\*/g;

/**
 * Parse url pattern
 * simple url parser that parses named keys and wildcards
 * returns
 * @param  {string} pattern - url pattern to match on
 * @example
 * '/requests/:id
 * '/requests/:id/*
 */
function parsePattern(pattern) {
  const names = [];
  pattern = pattern
    .replace(escapeRegExp, '\\$&')
    .replace(optionalParam, '(?:$1)?')
    .replace(namedParam, (match, optional) => {
      names.push(match.slice(1));
      return optional ? match : '([^/?]+)';
    })
    .replace(splatParam, () => {
      names.push('path');
      return '([^?]*?)';
    });

  return {
    regExp: new RegExp(`^${pattern}(?:\\?([\\s\\S]*))?$`),
    namedParams: names,
  };
}

/**
 * Match a method and path with a ServerRequest
 * @param  {ServerRequest} req - ServerRequest object
 * @param  {string} method - HTTP method
 * @param  {string} path - url path e.g. '/path/to/resource'
 * @param  {function} fn - function to invoke when method and path is matched
 */
async function match(req, method, path, fn) {
  const { regExp, namedParams } = parsePattern(path);

  // test that url exists
  if (regExp.test(req.url)) {
    // run regex pattern matcher
    const search = regExp.exec(req.url);

    // test that keys exist
    if (namedParams && search) {
      const values = search.slice(1, -1);
      // make url parameters and call route function
      const params = Object.fromEntries(namedParams.map((_, i) => [namedParams[i], values[i]]));
      return await fn(params);
    }

    return await fn();
  }
}

/**
 * Match a GET method
 * invoke a function given matched path
 * @param  {ServerRequest} req - ServerRequest object
 * @param  {string} path - url path e.g. '/path/to/resource'
 * @param  {function} fn - function to invoke when method and path is matched
 * @example
 * get(req,'/',async (params) => { do something });
 */
async function get(req, path, fn) {
  match(req, 'GET', path, fn);
}

/**
 * Match a DELETE method
 * invoke a function given matched path
 * @param  {ServerRequest} req - ServerRequest object
 * @param  {string} path - url path e.g. '/path/to/resource'
 * @param  {function} fn - function to invoke when method and path is matched
 * @example
 * del(req,'/',async (params) => { do something });
 */
async function del(req, path, fn) {
  match(req, 'DELETE', path, fn);
}

/**
 * Match a HEAD method
 * invoke a function given matched path
 * @param  {ServerRequest} req - ServerRequest object
 * @param  {string} path - url path e.g. '/path/to/resource'
 * @param  {function} fn - function to invoke when method and path is matched
 * @example
 * head(req,'/',async (params) => { do something });
 */
async function head(req, path, fn) {
  match(req, 'HEAD', path, fn);
}

/**
 * Match a PATCH method
 * invoke a function given matched path
 * @param  {ServerRequest} req - ServerRequest object
 * @param  {string} path - url path e.g. '/path/to/resource'
 * @param  {function} fn - function to invoke when method and path is matched
 * @example
 * patch(req,'/',async (params) => { do something });
 */
async function patch(req, path, fn) {
  match(req, 'PATCH', path, fn);
}

/**
 * Match a POST method
 * invoke a function given matched path
 * @param  {ServerRequest} req - ServerRequest object
 * @param  {string} path - url path e.g. '/path/to/resource'
 * @param  {function} fn - function to invoke when method and path is matched
 * @example
 * post(req,'/',async (params) => { do something });
 */
async function post(req, path, fn) {
  match(req, 'POST', path, fn);
}

/**
 * Match a PUT method
 * invoke a function given matched path
 * @param  {ServerRequest} req - ServerRequest object
 * @param  {string} path - url path e.g. '/path/to/resource'
 * @param  {function} fn - function to invoke when method and path is matched
 * @example
 * put(req,'/',async (params) => { do something });
 */
async function put(req, path, fn) {
  match(req, 'PUT', path, fn);
}

export { get, del, head, patch, post, put };
