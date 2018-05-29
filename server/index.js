'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
import http from 'http';
import https from 'https';
import { app } from './config/lib/express';
import config from './config/config';
import { databaseMongoose } from './config/lib/mongoose';
import chalk from 'chalk';
databaseMongoose().then(suc=> console.log(suc)).catch(err => console.log(chalk.red.bold(`Can not connect... \n ${err}`)) )



const port = config.env.port;
let serverHttp = http.createServer(app());
serverHttp.listen(port , () => {
    console.log(`RUN ON MODE : ${process.env.NODE_ENV}`)
    console.log(`RUN ON PORT : ${port}`)
    
} )





