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



const deletePhotoFunction = (nameFile) => new Promise((res, rej) => {
    fs.unlink(nameFile, err => {
        if (err) rej(err)
        res(true)
    })
})
/**-------------------------------------------------------------- */
export async function updatePhotomain(req, res, next) {
    try {
        let nameFile = req.name_file
        let find_ = await PhotoPath.find()
        let photo_ = find_[0]
        photo_.photoMain = nameFile 
        let findUp = await PhotoPath.findByIdAndUpdate(photo_._id , photo_)
        let new_ = await PhotoPath.find()
        res.json(new_)
    } catch (error) {
        next()
    }

}
export async function deletePhoto(req, res, next) {

    try {
        let photo_data = req.name_file
        let find_ = await PhotoPath.find()
        let photos = find_[0].photosub
        let indexOf_
        photos.forEach((suc, i) => {
            if (suc.id === photo_data)
                indexOf_ = i
        })
        let deletePhotoBefore = await deletePhotoFunction(`./public/subPhoto/${photos[indexOf_].photoPath}`) // delete image file
        photos.splice(indexOf_, 1) // remove list 1 list about this image.
        find_[0].photosub = photos // updata data in last
        let revomeIs = await PhotoPath.findByIdAndUpdate(find_[0]._id, find_[0]) // updata on database
        let new_ = await PhotoPath.find()
        // photo_data
        res.json(new_)


    } catch (err) {
        next(err)
    }
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
export async function addPhotoOtherFile(req, res, next) {
    try {
        let file = req.files[0].filename
        let photo_
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

            } else if (nullOrNot[0].photosub.length <= 9) {
                let findById = nullOrNot
                findById[0].photosub.push({
                    id: file.split(".")[0], // Created id for sead .
                    photoPath: file // Created is file for show on client.
                })
                let updateData = await PhotoPath.findByIdAndUpdate(findById[0]._id, findById[0])
                let new_ = await PhotoPath.find()
                photo_ = new_


            } else {
                photo_ = nullOrNot

            }
            res.json(photo_)

        } else {
            next("File is not required")
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
export async function paramId(req, res, next, id) {
    if (id) {

        req.name_file = id
        next()

    } else {
        res.status(400).json({
            message: "You have not require id param for client."
        })
    }
}