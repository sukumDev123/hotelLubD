import glob from 'glob';
import path from 'path';

const config = {
    env: require(path.resolve(`./config/env/${process.env.NODE_ENV || 'development'}.js`)).default,
    floder: {
        models: glob.sync('./modules/*/models/*.js'),
        socket: glob.sync('./modules/*/sockets/*.js')
    }
}

export default config