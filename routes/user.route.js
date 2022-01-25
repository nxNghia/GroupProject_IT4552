const express = require('express')

const User = require('../models/User.model')

const router = express.Router()

router.get('/:id/friends', (request, response) => {
    const param = request.params.id
    
    try
    {
        User.findOne({token: param}).then(result => {
            response.status(200).send(result.follow)
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

router.get('/getOther/:id', (request, response) => {
    const user_id = request.params.id
    
    try
    {
        User.find({ token: { $not: { $regex: user_id + '' } } }).then(result => {
            response.status(200).send({users: result})
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

router.post('/signin', (request, response) => {
    const user = request.body.user

    if(!user)
        response.statusMessage(200).send({ message: 'User is null' })

    try
    {
        User.findOne({ token: user.id }).then(result => {
            if(!result)
            {
                const new_user = new User({
                    token: user.id,
                    name: user.display_name,
                    follow: [],
                    following: [],
                    liked_song: []
                })
    
                new_user.save((err, res) => {
                    if (err)
                    {
                        response.status(200).send({ message: "Failed" })    
                    }
                    else
                        response.status(200).send({ message: 'Success', user: res })
    
    
                })
            }else{
                response.status(200).send({ message: 'Already signin', user: result })
            }
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

router.get('/song/liked/:id', (request, response) => {
    const id = request.params.id
    
    try
    {
        User.findOne({token: id}).then(res => {
            if(res)
            {
                response.status(200).send({songs: res.liked_song, message: 'Success'})
            }else{
                response.status(200).send({message: 'Failed'})
            }
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

router.get('/all', (request, response) => {
    try
    {
        User.find().then(result => {
            response.status(200).send(result)
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

router.post('/block', (request, response) => {
    try
    {
        const id = request.body.id

        User.findOne({ token: id }).then(result => {
            if(result)
            {
                result.blocked = !result.blocked
                if(result.blocked === false)
                    result.reported = false
                result.save((err, result2) => {
                    if(err)
                        response.status(400).send({ message: 'Failed', id: id })
                    else
                        response.status(200).send({ message: 'Success', id: id, result: result2 })
                })
            }else{
                response.status(400).send({ message: 'Not found' })
            }
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

router.post('/report', (request, response) => {
    try
    {
        const id = request.body.id
        
        // response.send({ message: 'Success' })

        User.findOne({ token: id }).then(result => {
            if(result)
            {
                result.reported = true
                result.save((err, result2) => {
                    if(err)
                    response.status(205).send({ message: 'Failed', id: id })
                    else
                        response.status(200).send({ message: 'Success', id: id, result: result2 })
                    })
            }else{
                response.status(200).send({ message: 'Not found' })
            }
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

router.get('/beFollowed/:id', (request, response) => {
    try
    {
        const userId = request.params.id

        User.findOne({ token: userId }).then(result => {
            const following_list = []

            result.being_followed.forEach(id => {
                const following_id_promise = new Promise((resolve, reject) => {
                    User.findOne({ token: id }).then(result2 => {
                        resolve(result2)
                    })
                })

                following_list.push(following_id_promise)
            })

            Promise.all(following_list).then(final_result => response.status(200).send({ message: 'Success', data: final_result }))
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed', data: [] })
    }
})

router.get('/following/:id', (request, response) => {
    try
    {
        const userId = request.params.id

        User.findOne({ token: userId }).then(result => {
            const following_list = []

            result.following.forEach(id => {
                const following_id_promise = new Promise((resolve, reject) => {
                    User.findOne({ token: id }).then(result2 => {
                        resolve(result2)
                    })
                })

                following_list.push(following_id_promise)
            })

            Promise.all(following_list).then(final_result => response.status(200).send({ message: 'Success', data: final_result }))
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed', data: [] })
    }
})

module.exports = router