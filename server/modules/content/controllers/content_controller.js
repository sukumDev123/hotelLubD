import mongoose from 'mongoose'
const Content = mongoose.model('Content')

function contentSave(data) {
    return new Promise((res, rej) => {
        let content = new Content(data)
        content.save(err => {
            if (err) {
                rej(err)
            }
            res(content)
        })

    })
}

/******************************** */
export async function removeContent(req, res) {
    try {
        let findByIdRemove = await Content.findByIdAndRemove(req.content._id)
        res.json({
            message: "delete success."
        })
    } catch (error) {

    }
}
export async function updateContent(req, res) {
    try {
        let findByIdUpdate = await Content.findByIdAndUpdate(req.content._id, req.body)
        let findContent = await Content.findById(req.content._id)
        res.json(findContent)
    } catch (error) {
        res.status(500).json({
            message: "Have problem find id"
        })
    }
}
export function getContent(req, res) {
    res.json(req.content)
}

export async function addContent(req, res) {
    if (req.user.roles[0] === 'admin') {
        try {
            let contentSave = await contentSaveFunc(req.body)
        } catch (error) {
            res.status(403).json(error)
        }
    } else {
        res.status(400).json({
            message: "You have not promise ."
        })
    }

}

export async function getContents(req, res) {
    try {
        let userFind = await Content.find().sort('create_at')
        res.json(userFind)
    } catch (error) {
        res.status(403).json({
            message: "Have problem find promotions."
        })
    }
}


export async function getParamContent(req, res, next, param) {
    try {
        let findContentById = await Content.findById(param)
        req.content = findContentById
        next()
    } catch (error) {
        res.status(403).json({
            message: "Param haven't on data"
        })
    }
}