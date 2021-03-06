process.env.NODE_ENV = process.env.NODE_ENV || 'development'
import http from 'http';
import {
    app
} from './config/lib/express';
import {
    databaseMongoose
} from './config/lib/mongoose';
import {
    socketSetting
} from './config/lib/socket';
import {
    passportFunction
} from './config/lib/passport';
import chalk from 'chalk'
async function onInit() {
    try {
        let db = await databaseMongoose();
        const port = process.env.PORT || 3000;
        let serverHttp = http.createServer(app());
        passportFunction();
        socketSetting(serverHttp);
        serverHttp.listen(port, () => {
            console.log(chalk.green("-----------------------------------------"))
            console.log(`RUN ON MODE : ${process.env.NODE_ENV}`)
            console.log(`RUN ON PORT : ${port}`)
            console.log(`DB : ${db}`)
            console.log(chalk.green("-----------------------------------------"))

        })
    } catch (error) {
        console.log(chalk.red.bold(`can't run : \n ${error}`))

    }
}

onInit();
