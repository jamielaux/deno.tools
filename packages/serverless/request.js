/**
 * decode request body and return string
 * @param {ServerRequest} req - ServerRequest object
 * @param {string} encoding - text encoding used during decoding
 * @return string
 */
export async function body(req, encoding = 'utf-8') {
  const b = await Deno.readAll(req.body);
  return new TextDecoder(encoding).decode(b);
}

/**
 * decode request body and return json object
 * @param {ServerRequest} req - ServerRequest object
 * @return object
 */
export async function json(req) {
  return JSON.parse(await body(req));
}
