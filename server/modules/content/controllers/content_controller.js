'use strict';

import mongoose from 'mongoose';
const Content = mongoose.model('Content');


export function addContent(req, res) {
    if(req.user){
        let content = new Content(req.body);
    }

}