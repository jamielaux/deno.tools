/**
 * respond with a json string
 * @param {ServerRequest} req - Deno ServerRequest
 * @param {any} response any type but usually an object to be serialised and returned as json
 * @return void
 */
export async function json(req, response) {
  const body = JSON.stringify(response);
  return req.respond({ body });
}
