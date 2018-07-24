import mongoose from 'mongoose'
import path from 'path'
import jwt from 'jsonwebtoken'
import config from '../config/config'
const User = mongoose.model("User")


function authorizationCheck(req) {

    return new Promise(async (res, rej) => {
        if (req.headers.authorization) {
            let author = req.headers.authorization.split(' ')[1]
            try {
                let jwtFind = await jwt.verify(author, config.env.secret)
                res(jwtFind)
            } catch (error) {
                rej({
                    status : 401 ,
                    messge : error
                })
            }
        } else {
            rej({
                status: 400,
                messge: 'You have not Token.'
            })
        }

    })

}

function findUserToken(userData) {

    return new Promise(async (res, rej) => {
        try {
            let findUserById = await User.findById(userData._id)
            findUserById.salt = undefined
            findUserById.password = undefined
            res(findUserById)
        } catch (error) {
            rej({
                status : 400 ,
                messge : "Not found you user token"
            })
        }
    })
}
export async function checkUserLogin(req, res, next) {
    try {
        let tokenCheck = await authorizationCheck(req)
        let findUser = await findUserToken(tokenCheck)
        req.user = findUser
        next()
    } catch (error) {
        next({
            message : JSON.stringify(error.messge) ,
            status : 401
        })
       
    }
}

