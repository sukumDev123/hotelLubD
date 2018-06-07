import fs from 'fs';
import path from 'path';


export async function readFile(req, res) {
    fs.readFile(path.resolve(`./modules/inforesort/models/resort_th.json`), 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({
                message: `You can't read file.\n${err}`
            })
        } else {
            data = JSON.parse(data)
            return res.json({
                data: data,
                type: typeof (data)
            })
        }
    })

}

export function writeFileResort(req, res) {
    let data = req.body;
    data.pathSave = undefined;
    if (typeof (data) == 'object') {
        fs.writeFile(path.resolve(`./modules/inforesort/models/${req.body.pathSave}.json`), JSON.stringify(data), 'utf8', (err, data) => {
            if (err) {
                return res.json(404).json({
                    message: `You can't writed file.\n${err}`
                })
            } else {
                return res.json({
                    message: "Writed success...",
                    data: data
                })
            }
        })
    } else {
        return res.status(404).json({
            message: "data isn't object "
        })
    }
}