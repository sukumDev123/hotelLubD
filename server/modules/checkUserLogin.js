import {model} from 'mongoose'
import path from 'path'
import jwt from 'jsonwebtoken'
import config from '../config/config'
const User = model("User")


function authorizationCheck(req) {

    return new Promise(async (res, rej) => {
        if (req.headers.authorization) {
            let author = req.headers.authorization.split(' ')[1]
            try {
                let jwtFind = await jwt.verify(author, config.env.secret)
                res(jwtFind)
            } catch (error) {
                rej(error)
            }
        }

    })

}

function findUserToken(userData) {

    return new Promise(async (res, rej) => {
        try {
            let findUserById = await User.findById(userData._id)
            res(findUserById)
        } catch (error) {
            rej(error)
        }
    })
}

export async function checkUserLogin(req, res, next) {

    try {
        let tokenCheck = await authorizationCheck(req)
        let findUser = await findUserToken(tokenCheck)
        next()
    } catch (error) {
        res.status(400).json({
            status: 400,
            messge: "Promise.... Auth\n or " + error
        })
    }


}