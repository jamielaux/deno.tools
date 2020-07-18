import {
  graphql,
  buildSchema as bs,
} from "https://cdn.pika.dev/graphql@^15.1.0";
import {
  serve as s,
  ServerRequest,
} from "https://deno.land/std/http/server.ts";
import { post } from "./router.js";
import { read } from "./file.js";
import { json as toJSON } from "./respond.js";
import { json } from "./request.js";

/**
 * A helper function to build a GraphQLSchema directly from a source document at a given path.
 * @param  {string} path - path to graphql schema
 * @example
 * buildSchema('schema.graphql');
 */
export function buildSchema(path) {
  return bs(read(path), null);
}

/**
 * setups a http server to listen and respond to graphql requests
 * @param {object} options - function options
 * @param {string} options.path - graphql server path
 * @param {number} options.port - server port
 * @param {object} options.resolver - graphql resolver
 * @param {string} options.schema - (built) graphql schema
 * @return void
 * @example
 * const resolver = { hello: () => 'Hello world!' };
 * serve({ resolver });
 */
export async function serve({
  path = "/graphql",
  port = 5000,
  resolver,
  schema,
}) {
  // start server and handle any requests
  const server = s({ port });
  for await (const req of server) {
    post(req, path, async () => {
      const { query, variables } = await json(req);
      toJSON(
        req,
        await graphql(
          schema,
          query,
          resolver,
          null,
          variables,
          null,
          null,
          null
        )
      );
    });
  }
}
