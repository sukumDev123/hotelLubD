'use strict';


import * as controllers from '../controllers/inforesort_controller';
import { checkUserLogin } from '../../checkUserLogin';



export function inforResortRoute() {

    const router = require('express').Router();

    router.route('/info/resort')
    .get(controllers.readFile)
    .post(checkUserLogin , controllers.writeFileResort)
 
    return router



}