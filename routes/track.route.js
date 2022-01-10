const { response } = require('express')
const express = require('express')

const User = require('../models/User.model')

const router = express.Router()

router.post('/liked', (request, response) => {
    const userId = request.body.userId
    const new_song = request.body.song

    User.findOne({ token: userId }).then(res => {
        if(res)
        {
            if(res.liked_song.some(song => song.track.id === new_song.track.id) === false)
            {
                res.liked_song.push(new_song)
                res.save((err, result) => {
                    if(err)
                    {
                        response.status(200).send({message: 'Failed'})
                    }else{
                        response.status(200).send({message: 'Success', ...result})
                    }
                })
            }else{
                response.status(200).send({message: 'Duplicated'})
            }
        }else{
            response.status(200).send({message: 'Insufficient user id'})
        }
    })
})

router.post('/remove', (request, response) => {
    const remove_song = request.body.song
    const userId = request.body.userId

    User.findOne({ token: userId }).then(res => {
        if(res)
        {
            res.liked_song = res.liked_song.filter(song => song.track.id !== remove_song.track.id)

            res.save(err => {
                if (err) console.log(err)
                response.status(200).send({ message: 'Success' })
            })
        }else{
            response.status(200).send({ message: 'Failed' })
        }
    })
})

module.exports = router