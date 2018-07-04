import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose'
const PhotoPath = mongoose.model("PhotoPath")

function readFileAsync(pathFile) {
    return new Promise((res, rej) => {

        fs.readFile(path.resolve(pathFile), 'utf8', (err, dataInfo) => {
            if (err) {
                rej(err)
            }
            res(dataInfo)
        })

    })
}

function writeFileAsync(pathFile, data) {
    return new Promise((res, rej) => {
        fs.writeFile(pathFile, JSON.stringify(data),  (err, dataInfo) => {
            if (err) {
                rej(false)
            } else {
                res(true)
            }
        })
    })
}

const isNotNull = _data => (_data.title && _data.photoMain && _data.detail && _data.address && _data.phone && data.title2 && data.descriton2) ? true : false


/**-------------------------------------------------------------- */
export function deletePhoto() {
    fs.unlink(path.resolve('./public/main/photo-1530324185354-.png', err => {
        let show = err ? err : "Success"

        res.json(show)
    }))
}
export async function readFile(req, res , next) {
    try {
        let read = await readFileAsync("./modules/inforesort/models/resort_th.json")
        read = JSON.parse(read)
        let photoMain = await PhotoPath.find()
        let photo 
        if(!photoMain.length){
            photo = '/main/photo1.jpg'
        }else {
            photo = photoMain[photoMain.length - 1]

        }
        read.photoMain = photo
        res.json(read)
    } catch (error) {
        next(error)
    }

}
export async function getPhotoKeep(req,res,next) {
    try {
        let readPhoto = await PhotoPath.find()
        
        res.json(readPhoto)
    } catch (error) {
        next(error)
    }
}
export async function changePhoto(req, res , next) {
    try {
        let id_ = req.files[0].filename.split(".")[0]

        if (req.files) {
            let pathFocued = './modules/inforesort/models/add_photo.json'
            let readFile = await readFileAsync(pathFocued)
            readFile = JSON.parse(readFile)
            readFile.data.push({
                id:id_,
                photoPath : req.files[0].filename
            })
            let newObj = await writeFileAsync(pathFocued,readFile)
            if(newObj){
                res.json({
                    message : "Save Image Success." ,
                    data : JSON.stringify(readFile)
                })
            }
            next("Can't Uploads Image")
            
        } else {
            console.log("FIle is not required")
        }

    } catch (error) {
        next(error)
    }

}

export async function writeFileResort(req, res) {
    try {
        if (isNotNull(req.body)) {
            let read = await writeFileAsync("./modules/inforesort/models/resort_th.json", req.body)
            res.json(read)

        } else {
            res.json({
                message: 'Data is empty.'
            })
        }
    } catch (error) {

        res.status(404).json({
            message: "Not Found \n" + error
        })
    }

}
export function paramId(req, res, next, id) {

}