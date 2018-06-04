'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import config from '../config';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
function middleWare(app) {
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParser.json())
	

	app.use(session({
        secret: config.env.secret,
        proxy: true,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
	}))
	app.use(function (req, res, next) {

        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
        next();
	});
	app.use(passport.initialize());
	
	app.use(passport.session());

}

function viewEngine(app){
	app.set('view' , './');
	app.use(express.static('./dist'))
}
function routerPath(app){
	const { userRoutes } = require(path.resolve('./modules/users/routes/user_route'));
	app.use('/api' , userRoutes() );
}
export function app() {

	let app = express();

	if(process.env.NODE_ENV === 'development') {
		app.use(morgan())
	}

	middleWare(app);
	viewEngine(app);
	routerPath(app);

	return app;
}
