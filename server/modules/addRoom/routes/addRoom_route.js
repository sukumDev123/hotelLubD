'use strict'
import {
    Router
} from 'express'
import * as rm_c from '../controllers/addRoom_controller'
import { checkUserLogin } from '../../checkUserLogin';


export function addRoom() {

    const router = Router();
    
    router.route('/resort/rooms').get(rm_c.showRooms).post(checkUserLogin ,rm_c.addNewRoom)
    router.route('/resort/room/:idRoom').get(rm_c.showRoom).put(checkUserLogin , rm_c.updateRoom).delete(checkUserLogin , rm_c.deleteRoom)
    router.param('idRoom', rm_c.getParamRoom)
    return router
}