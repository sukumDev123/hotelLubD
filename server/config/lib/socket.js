
import socket from 'socket.io';
import config from '../config';
import path from 'path';
import chalk from 'chalk';



export function socketSetting(http) {
    const io = socket(http);
    console.log(chalk.rgb(190, 239, 74).bold("Connected Socket ...."))
    io.sockets.on('connect', socket => {
        config.floder.socket.forEach(pathSocket => require(path.resolve(pathSocket)));
    })
}