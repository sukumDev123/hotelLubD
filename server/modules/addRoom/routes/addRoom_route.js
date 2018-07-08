import {
    Router
} from 'express'
import * as rm_c from '../controllers/addRoom_controller'
import { checkUserLogin } from '../../checkUserLogin';


export function addRoom() {

    const router = Router();
    
    router.get('/show' , rm_c.getRoomData)
    router.post('/add' , checkUserLogin , rm_c.add_new_room)
    router.put('/edit/:id_room' , rm_c.edit_room )
    router.delete('/delete/:id_room' ,rm_c.delete_room)
    router.param('id_room' , rm_c.param_id_room)
    return router
}