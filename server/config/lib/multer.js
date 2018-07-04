import multer from 'multer'
import path from 'path'
const storage = multer.diskStorage({
	destination : path.resolve('./public/subPhoto/'),
	filename : function(req,file,cb) {
		cb(null,`${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`)
	}
})

const uploads = multer({
    storage:storage
})


export default uploads