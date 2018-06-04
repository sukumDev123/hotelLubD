'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
import http from 'http';
import https from 'https';
import { app } from './config/lib/express';
import config from './config/config';
import { databaseMongoose } from './config/lib/mongoose';
import chalk from 'chalk';
import { socketSetting } from './config/lib/socket';
import { passportFunction } from './config/lib/passport';

async function onInit() {
    try {
        let db = await databaseMongoose();
        const port = process.env.PORT || 3000;
        let serverHttp = http.createServer(app());
        passportFunction();
        socketSetting(serverHttp);
        serverHttp.listen(port, () => {
            console.log(`RUN ON MODE : ${process.env.NODE_ENV}`)
            console.log(`RUN ON PORT : ${port}`)
        
        })
    } catch (error) {
        console.log(`can't roun : \n ${error}`)

    }
}

onInit();
