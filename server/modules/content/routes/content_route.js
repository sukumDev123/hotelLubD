import { checkUserLogin } from '../../checkUserLogin'
import * as cc from '../controllers/content_controller'
import express from 'express'

export function contentRoutes(){
    const router = express.Router()

    router.post('/add' ,checkUserLogin , cc.addContent)
    

    return router
}