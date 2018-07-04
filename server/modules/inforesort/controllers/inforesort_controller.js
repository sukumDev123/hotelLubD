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
        fs.writeFile(pathFile, JSON.stringify(data), (err, dataInfo) => {
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
export async function readFile(req, res, next) {
    try {
        let read = await readFileAsync("./modules/inforesort/models/resort_th.json")
        read = JSON.parse(read)
        let photoMain = await PhotoPath.find()
        let photo
        if (!photoMain.length) {
            photo = '/main/photo1.jpg'
        } else {
            photo = "/subPhoto/" + photoMain[0].photoMain

        }
        console.log(photo)
        read.photoMain = photo
        res.json(read)
    } catch (error) {
        next(error)
    }

}
export async function getPhotoKeep(req, res, next) {
    try {
        let readPhoto = await PhotoPath.find()

        res.json(readPhoto)
    } catch (error) {
        next(error)
    }
}
export async function changePhoto(req, res, next) {
    try {
        let file = req.files[0].filename
        let photo_ , message_temp
        if (req.files) {
            let nullOrNot = await PhotoPath.find() //Check data have to null. If not null will replace data.
            if (!nullOrNot.length) {
                let pathPhoto = new PhotoPath({
                    photoMain: file,
                    photosub: [{
                        id: file.split(".")[0], // Created id for sead .
                        photoPath: file // Created is file for show on client.
                    }]
                })
                let save = await pathPhoto.save()
                let findById = await PhotoPath.find()
                photo_ = findById[0]
                message_temp = "Save Image First Success."
            } else if(nullOrNot[0].photosub.length <= 9) {
                let findById = await PhotoPath.find()
                findById[0].photosub.push({
                    id: file.split(".")[0], // Created id for sead .
                    photoPath: file // Created is file for show on client.
                })
                let updateData = await PhotoPath.findByIdAndUpdate(findById[0]._id , findById[0])
                photo_ = [updateData] 
                message_temp = "Add new Image success."

            }  else {
                photo_ = nullOrNot
                message_temp = "Data is not save. Because store for keep images isn't empty."
            }
            res.json({
                message : message_temp,
                data : photo_ ,
                
            })
            
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