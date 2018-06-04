'use strict';

import * as userC from '../controllers/user_controller';
import express from 'express';


export function userRoutes(){

    const router = express.Router();

    router.post('/auth/sigin' , userC.signIn);
    router.post('/auth/signup/:type', userC.singup);

    router.param('type'  , userC.findType )
    return router
}