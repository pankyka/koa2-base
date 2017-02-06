import log from '../utils/log';

export default async (ctx, next) => {
  try {

    await next();

  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = 'Internal Server Error';
    log.error(`Exception thrown at: "${ctx.originalUrl}" params: ${JSON.stringify(ctx.params)}\n`, err);
  }
}