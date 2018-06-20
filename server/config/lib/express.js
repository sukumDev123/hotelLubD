'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import config from '../config'
import morgan from 'morgan'
import passport from 'passport'
import path from 'path'

function headerSet(req, res, next) {

	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
	res.setHeader('Access-Control-Allow-Credentials', true)
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization')
	next()

}


function middleWare(app) {

	app.use(cookieParser())
	app.use(bodyParser.urlencoded({
		extended: false
	}))
	app.use(bodyParser.json())
	app.use(session({
		secret: config.env.secret,
		proxy: true,
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: false
		}
	}))
	app.use(headerSet)
	app.use(passport.initialize())
	app.use(passport.session())

}

function viewEngine(app) {
	app.set('view', './');
	app.use(express.static('./public'))
}

function setNotFonud(req, res,next) {
	let err = new Error('Not Found')
	err.status = 404
	next(error)
}
function handlerErroo(error,req,res,next){
	res.status(error.status || 500).json({
		error: {
			state : error.state,
			message : error.message
		}
	})
}

function routerPath(app) {

	const {
		userRoutes
	} = require(path.resolve('./modules/users/routes/user_route'));
	const {
		inforResortRoute
	} = require(path.resolve('./modules/inforesort/routes/inforresort_route'))
	const {
		addRoom
	} = require(path.resolve('./modules/addRoom/routes/addRoom_route'))
	const {
		bookIngRoute
	} = require(path.resolve('./modules/booking/routes/booking_route'))
	const {
		contentRoutes
	} = require(path.resolve('./modules/content/routes/content_route'))

	app.use('/api/user', userRoutes())
	app.use('/api/data', inforResortRoute())
	app.use('/api/room', addRoom())
	app.use('/api/booking', bookIngRoute())
	app.use('/api/content', contentRoutes())
	app.use(setNotFonud)
	app.use(handlerErroo)

}
/******************************************************** */
export function app() {
	let app = express();
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'))
	}
	middleWare(app)
	viewEngine(app)
	routerPath(app)
	return app
}