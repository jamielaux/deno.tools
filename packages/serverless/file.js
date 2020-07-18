// File helpers
// common tools for dealing with files

/**
 * read and decode file from path
 * @param  {string} path - relative file path
 * @return string
 */
async function read(path) {
  return new TextDecoder('utf-8').decode(await Deno.readFile(path));
}

export { read };
