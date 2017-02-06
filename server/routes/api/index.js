import Router from 'koa-router';
import data from './data';

const router = new Router();

router.use('/data', data.routes());

export default router;