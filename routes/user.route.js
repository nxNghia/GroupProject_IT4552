const { response } = require('express')
const express = require('express')

const User = require('../models/User.model')

const router = express.Router()

router.get('/:id/friends', (request, response) => {
    const param = request.params.id
    User.findOne({token: param}).then(result => {
        response.status(200).send(result.follow)
    })
})

router.get('/song/liked/:id', (request, response) => {
    const id = request.params.id
    User.findOne({token: id}).then(res => {
        if(res)
        {
            response.status(200).send({songs: res.liked_song, message: 'Success'})
        }else{
            response.status(200).send({message: 'Failed'})
        }
    })
})

module.exports = router