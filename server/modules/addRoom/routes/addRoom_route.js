import {
    Router
} from 'express'
import * as rm_c from '../controllers/addRoom_controller'
import { checkUserLogin } from '../../checkUserLogin';


export function addRoom() {

    const router = Router();
    
    router.get('/show' , rm_c.getRoomData)
    router.post('/add' , checkUserLogin , rm_c.add_new_room)
    //router.param('num_select', rm_c.param_show_data)
    return router
}