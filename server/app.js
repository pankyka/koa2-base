import Koa from 'koa';
import log from './utils/log';
import middlewares from './middlewares';
import routes from './routes';

const app = new Koa();
const port = process.env.PORT || 3000;

const server = middlewares
  .attachTo(app)
  .use(routes())
  .listen(port, () => {

  log.info(`App listening at http://localhost:${port}, pid: ${process.pid}`);
});

function gracefulShutdown () {

  log.info('App shutting down');
  server.close();
  process.exit(0);
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

export default {
  app,
  server
}