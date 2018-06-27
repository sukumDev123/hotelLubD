import fs from 'fs';
import path from 'path';

function getDataToJson(data) {
    return new Promise(res => {
        res(JSON.parse(data))
    })
}

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

const  isNotNull = _data => (_data.title && _data.photoMain && _data.detail && _data.address && _data.phone && data.title2 && data.descriton2) ? true : false


/**-------------------------------------------------------------- */

export async function readFile(req, res) {
    try {
        let read = await readFileAsync("./modules/inforesort/models/resort_th.json")
        read = await getDataToJson(read)
        res.json(read);
    } catch (error) {
        res.status(404).json({
            message: "Not Found \n" + error
        })
    }

}


export async function writeFileResort(req, res) {
    try {
        if (isNotNull(req.body)) {
            let read = await writeFileAsync("./modules/inforesort/models/resort_th.json", req.body)
            res.json(read)

        } else {
            res.json({
                message : 'Data is empty.'
            })
        }
    } catch (error) {

        res.status(404).json({
            message: "Not Found \n" + error
        })
    }

}