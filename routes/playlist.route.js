const { response } = require('express')
const express = require('express')

const User = require('../models/User.model')

const router = express.Router()

const Playlist = require('../models/Playlist.model')

router.get('/:userId', (request, response) => {
    const userId = request.params.userId

    Playlist.find({ 'owner.id': userId }).then(result => {
        response.status(200).send(result)
    })
})

router.post('/create', (request, response) => {
    const req_data = request.body.playlist_info
    const new_playlist = new Playlist({
        name: req_data.name,
        images: req_data.image,
        tracks: {
            songs: [],
            total: 0
        },
        owner: req_data.owner
    })

    new_playlist.save((err, result) => {
        if (err) {
            response.status(200).send({ message: "Failed" })
        }else{
            response.status(200).send({ message: "Success", result: result })
        }
    })
})

router.post('/add', (request, response) => {
    const playlist_id = request.body.playlist_id
    const new_song = request.body.song

    Playlist.findOne({ _id: playlist_id }).then(result => {
        if(result)
        {
            if(result.tracks.songs.some(song => song.id === new_song.id))
            {
                response.status(200).send({ message: 'Duplicate' })
            }else{
                result.tracks.total = result.tracks.songs.length + 1
                result.tracks.songs.push(new_song)

                response.status(200).send({ message: 'Success' })
            }
        }else{
            response.status(200).send({ message: 'Unavailable' })
        }
    })
})

router.post('/update', (request, response) => {
    const playlist_id = request.body.playlist_id
    const new_name = request.body.new_name

    Playlist.findOne({ _id: playlist_id }).then(result => {
        if(result)
        {
            result.name = new_name
            result.save((err, result2) => {
                if (err)
                {
                    response.status(200).send({ message: "Failed", result: result })
                }else{
                    response.status(200).send({ message: "Success", result: result2 })
                }
            })
        }else{
            response.status(200).send({ message: "Unavailable" })
        }
    })
})

router.post('/remove', (request, response) => {
    const id = request.body.id

    Playlist.deleteOne({ _id: id }).then(() => {
        response.status(200).send({ message: 'Success', id: id })
    }).catch(err => response.status(200).send({ message: 'Failed', error: err }))
})

module.exports = router