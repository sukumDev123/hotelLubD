import { checkUserLogin } from '../../checkUserLogin'
import * as cc from '../controllers/content_controller'
import express from 'express'

export function contentRoutes(){
    const router = express.Router()

    router.post('/add' ,checkUserLogin , cc.addContent)
    router.get('/contents',cc.getContents)
    router.route('/content/:idContent').get(cc.getContent).put(cc.updateContent).delete(cc.removeContent)
    router.param('idContent' , cc.getParamContent)

    return router
}