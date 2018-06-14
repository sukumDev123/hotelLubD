'use strict';

import mongoose from 'mongoose'
const Content = mongoose.model('Content')


export function addContent(req, res) {
    console.log(req.user.roles[0])
    if(req.user.roles[0] === 'admin'){
        console.log('admin content')
        // let content = new Content(req.body)
    }

}