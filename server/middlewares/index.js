import compress from 'koa-compress';
import views from './views';
import less from './less';
import serve from './serve';
import errorHandler from './errorHandler';
import globals from '../utils/globals';

function attachTo (koaApp) {

  views.use(koaApp);

  return koaApp
    // gzip compressor
    .use(compress())

    // less middleware
    .use(less(`${globals.ROOT_DIR}/public`))
      
    // static file server
    .use(serve(`${globals.ROOT_DIR}/node_modules`))
    .use(serve(`${globals.ROOT_DIR}/public`))

    // log errors with winston
    .use(errorHandler)
  ;
}

export default {
  attachTo
}