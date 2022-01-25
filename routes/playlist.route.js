const { response } = require('express')
const express = require('express')

const User = require('../models/User.model')
const Playlist = require('../models/Playlist.model')

const router = express.Router()


router.get('/:userId', (request, response) => {
    const userId = request.params.userId

    try
    {
        Playlist.find({ 'owner.id': userId }).then(result => {
            response.status(200).send(result)
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

// router.get('/get/:id', (request, response) => {
//     const playlist_id = request.params.id

//     try
//     {
//         Playlist.findOne({ _id: playlist_id }).then(result => {
//             response.status(200).send({ message: 'Success', result: result })
//         })
//     }catch(err)
//     {
//         response.status(400).send({ message: 'Failed', result: null })
//     }
// })

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

    try
    {
        new_playlist.save((err, result) => {
            if (err) {
                response.status(200).send({ message: "Failed" })
            }else{
                response.status(200).send({ message: "Success", result: result })
            }
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

router.post('/add', (request, response) => {
    const playlist_id = request.body.playlist_id
    const new_song = request.body.song

    try
    {
        Playlist.findOne({ _id: playlist_id }).then(result => {
            if(result)
            {
                if(result.tracks.songs.some(song => song.track.id === new_song.id))
                {
                    response.status(200).send({ message: 'Duplicate' })
                }else{
                    result.tracks.total = result.tracks.songs.length + 1
                    result.tracks.songs.push(new_song)
    
                    result.save(err => {
                        if (err) console.log(err)
                        response.status(200).send({ message: err ? 'Failed to save' : 'Success' })
                    })
                }
            }else{
                response.status(200).send({ message: 'Unavailable' })
            }
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

router.post('/update', (request, response) => {
    const playlist_id = request.body.playlist_id
    const new_name = request.body.new_name

    try
    {
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
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

router.post('/remove', (request, response) => {
    const id = request.body.id

    try
    {
        Playlist.deleteOne({ _id: id }).then(() => {
            User.find().then(users => {
                users.forEach(user => {
                    if(user.follow_playlists.includes(id))
                    {
                        user.follow_playlists = user.follow_playlists.filter(_id_ => _id_ !== id)
                    }
                })

                response.status(200).send({ message: 'Success', id: id })
            })
        }).catch(err => response.status(200).send({ message: 'Failed', error: err }))
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

router.get('/else/:id', (request, response) => {
    const user_id = request.params.id

    try
    {
        Playlist.find({ 'owner.id': { $not: { $regex: user_id + '' } } }).then((result = []) => {
            response.status(200).send({ message: 'Success', playlists: result })
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

router.post('/follow', (request, response) => {
    const user_id = request.body.user_id
    const playlist_id = request.body.playlist_id

    try
    {
        User.findOne({ token: user_id }).then(result => {
            if(result)
            {
                const index = result.follow_playlists.findIndex(playlist => playlist === playlist_id)
    
                if(index === -1)
                {
                    result.follow_playlists.push(playlist_id)
                }else{
                    result.follow_playlists.splice(index, 1)
                }
    
                result.save((err) => {
                    if (err)
                    {
                        response.status(200).send({ message: 'Failed to save' })
                    }else{
                        const playlists = []
    
                        result.follow_playlists.forEach(playlist_id => {
                            const playlist = new Promise((resolve, reject) => {
                                Playlist.findOne({ _id: playlist_id })
                                .then(result2 => {
                                    if(result2)
                                    {
                                        resolve(result2)
                                    }else{
                                        reject(result2)
                                    }
                                })
                            })
    
                            playlists.push(playlist)
                        });
    
                        Promise.all(playlists).then((result2 = []) => response.status(200).send({ message: 'Success', playlists: result2 }))
                    }
                })
            }else{
                response.status(200).send({ message: 'Failed to find user' })
            }
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

router.get('/followed/:userId', (request, response) => {
    const userId = request.params.userId

    try
    {
        User.findOne({ token: userId })
        .then(result => {
                const playlists = []

                result.follow_playlists.forEach(playlist_id => {
                    const playlist = new Promise((resolve, reject) => {
                        Playlist.findOne({ _id: playlist_id })
                        .then(result2 => {
                            resolve(result2)
                        })
                    })

                    playlists.push(playlist)
                });

                Promise.all(playlists).then((result2) => {
                    response.status(200).send({ message: 'Success', playlists: result2 })
                })
        })
    }catch(err)
    {
        console.log(err)
        response.status(400).send({ message: 'Failed' })
    }
})

module.exports = router