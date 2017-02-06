import path from 'path';
import send from 'koa-send';

const http = {
  HEAD: 'HEAD',
  GET: 'GET'
};

export default function (paths, options) {

  options = options || {};

  if (Array.isArray(paths)) {
    options.root = paths.map(p => path.resolve(p));
  } else {
    options.root = path.resolve(paths);
  }

  if (options.index !== false)
    options.index = options.index || 'index.html';

  if (!options.defer) {
    return async function serve(ctx, next){
      if (ctx.method === http.HEAD || ctx.method === http.GET) {
        if (await send(ctx, ctx.path, options))
          return true;
      }
      await next();
    };
  }

  return async function serve(ctx, next){
    await next();

    if (ctx.method != http.HEAD && ctx.method != http.GET)
      return true;

    if (ctx.body != null || ctx.status != 404)
      return true;

    await send(ctx, ctx.path, options);
  };
};