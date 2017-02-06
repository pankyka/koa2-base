import Router from 'koa-router';
import homeRoutes from './home';
import api from './api';

const router = new Router();

router.use('/', homeRoutes.routes());
router.use('/api', api.routes());

export default () => router.routes();