import {
    Router
} from 'express'
import * as rs from '../controllers/booking_controller'
import {
    checkUserLogin
} from '../../checkUserLogin';
export function bookIngRoute() {
    const router = Router()
    router.post('/user/reserve', rs.reserveRoom)
    router.get('/user/history', checkUserLogin, rs.historyRoom)
    router.route('/user/history/:idBooking').get(rs.getBookingOneList).delete( checkUserLogin, rs.deleteReserveRoom)
    // router.route('/user/handler/:idBooking').put(rs.updateReserveRoom).delete(rs.deleteReserveRoom)
    router.param('idBooking', rs.getParamRoom)
    return router
}