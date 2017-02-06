import Pug from 'koa-pug';
import globals from '../utils/globals';

// view helpers
import lodash from 'lodash';
import moment from 'moment';

const isDebug = process.env.NODE_ENV === 'development';
// helpers end

const pug = new Pug({
  viewPath: `${globals.ROOT_DIR}/views`,
  debug: isDebug,
  noCache: isDebug,
  compileDebug: isDebug,
  cache: !isDebug,
  pretty: true,
  helperPath: [
    { moment: moment },
    { _: lodash },
    { IS_DEV: isDebug }
  ]
});

export default pug;