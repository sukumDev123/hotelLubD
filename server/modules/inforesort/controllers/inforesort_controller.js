import fs from 'fs';
import path from 'path';






export async function readFile(req, res) {
    fs.readFile(path.resolve("./data/resort.json"), 'utf8', (err, data) => {
        if (err) {
            return res.json({
                message: err
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
    if (typeof (data) == 'object') {
        /*fs.writeFile(path.resolve("./data/resort.json"), JSON.stringify(data), 'utf8', (err, data) => {
            if (err) {
                return res.json(404).json({
                    message: "Can not write file resort.json"
                })
            } else {
                return res.json({
                    message: "Writed success...",
                    data: data
                })
            }
        })*/
    } else {
        return res.status(404).json({
            message: "data isn't object "
        })
    }
}