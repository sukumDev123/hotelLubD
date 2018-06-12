'use strict'
import { Router } from 'express'
import * as rm_c from '../controllers/addRoom_controller'


export function addRoom(){

    const router = Router();

    router.get('/resort/rooms' , rm_c.showRooms)    



    return router
}