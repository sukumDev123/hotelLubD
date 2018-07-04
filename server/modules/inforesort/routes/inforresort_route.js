

import * as controllers from '../controllers/inforesort_controller';
import { checkUserLogin } from '../../checkUserLogin';
import uploads from '../../../config/lib/multer'


export function inforResortRoute() {

    const router = require('express').Router();

    router.route('/info/resort')
    .get(controllers.readFile)
    .post(checkUserLogin ,  controllers.writeFileResort)
    // ,
    router.route('/info/photo/' ).post(  uploads.array("photo", 12) , controllers.addPhotoOtherFile).get(controllers.getPhotoKeep)
   
    router.delete('/info/photo/:idDelete',controllers.deletePhoto)
    //
    router.param('idDelete' , controllers.paramId)
    return router



}