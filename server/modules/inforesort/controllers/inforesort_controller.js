import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose'

function getDataToJson(data){
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
export async function readFile(req, res) {
    try {
        let read = await readFileAsync("./modules/inforesort/models/resort_th.json");
        read = await getDataToJson(read);
        res.json(read);
    } catch (error) {
        res.status(404).json({
            message: "Not Found \n" + error
        })
    }

}

export async function writeFileResort(req, res) {
    try {
        /* read = await writeFileAsync("./modules/inforesort/models/resort_th.json", req.body);
        res.json(read);*/
        res.json({message : 'Comin'})
    } catch (error) {

       /* res.status(404).json({
            message: "Not Found \n" + error
        })*/
    }

}