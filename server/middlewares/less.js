import path from 'path';
import url from 'url';
import fs from 'fs-promise';
import less from 'less';

const IS_DEV = process.env.NODE_ENV === 'development';

const defaultLessOptions = {
  compress: 'auto',
  paths: []
};

export default function (sourcePath, lessOptions) {

  Object.assign(defaultLessOptions, lessOptions);

  return async function (ctx, next) {

    let pathname = url.parse(ctx.req.url).pathname;

    if (!(ctx.req.method == 'GET' && pathname.endsWith('.css'))) {

      await next();

    } else {

      const cssFile = path.join(sourcePath, pathname);

      if (await fs.exists(cssFile)) {

        await next();
      }
      else {

        const dirPath = path.join(sourcePath, path.dirname(pathname));
        const fileName = path.basename(pathname, path.extname(pathname));
        const filePath = path.join(dirPath, fileName) + '.less';

        const src = await fs.readFile(filePath, 'utf8');

        defaultLessOptions.filename = filePath;
        const rendered = await less.render(src, defaultLessOptions);

        await fs.writeFile(cssFile, rendered.css);

        ctx.set('Content-Type', 'text/css; charset=utf-8');
        ctx.set('Content-Length', rendered.css.length);
        ctx.body = rendered.css;
      }
    }
  }
}
