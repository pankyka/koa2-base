import Router from 'koa-router';
import log from '../utils/log';

const router = new Router();

router.get('/', async ctx => {

  await ctx.render('index');
});

export default router;