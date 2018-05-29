'use stirct';
import glob from 'glob';
import path from 'path';

export default {
    env : require(path.resolve(`./config/env/${process.env.NODE_ENV}.js`)).default,
    floder : {
        models : glob.sync('./modules/*/models/*')
    }
}