import fs from 'fs';
import path from 'path';


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
        fs.writeFile(path.resolve(pathFile), JSON.stringify(data), 'utf8', (err, dataInfo) => {
            if (err) {
                rej(err)
            } else {
                res(dataInfo)
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
export async function readFile(req, res) {
    try {
        let read = await readFileAsync("./modules/inforesort/models/resort_th.json")
        let readPhoto = await readFileAsync("./modules/inforesort/models/photo_path.json")
        read = JSON.parse(read)
        readPhoto = JSON.parse(readPhoto)
        read.photoMain = readPhoto.photoMain
        res.json(read)
    } catch (error) {
        res.status(404).json({
            message: "Not Found \n" + error
        })
    }

}

export async function changePhoto(req, res) {
    
    let id_ = req.files[0].filename.split(".")[0]
    try {
        if(req.files){
        let pathFocued = './modules/inforesort/models/photo_path.json'
        let readPhotopath = await readFileAsync(pathFocued)
        readPhotopath = JSON.parse(readPhotopath)
        readPhotopath.phototemp.push({
            id : id_ ,
            photopath: req.files[0].path
        })
        let writeFileValue = await writeFileAsync(pathFocued, readPhotopath)
        res.json({
            message : "Save Image Photo Success ."
        })    
        }
        
    } catch (error) {
        console.log(error)
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