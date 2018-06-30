'use strict';


import * as controllers from '../controllers/inforesort_controller';
import { checkUserLogin } from '../../checkUserLogin';
import uploads from '../../../config/lib/multer'



export function inforResortRoute() {

    const router = require('express').Router();

    router.route('/info/resort')
    .get(controllers.readFile)
    .post( controllers.writeFileResort)
    // ,
    router.route('/info/photo/' ).post(  uploads.array("photo", 12) , controllers.changePhoto)
    router.delete('/info/photo/:idDelete',controllers.deletePhoto)
    //checkUserLogin
    router.param('idDelete' , controllers.paramId)
    return router



}