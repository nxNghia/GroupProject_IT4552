const { response } = require('express')
const express = require('express')

const User = require('../models/User.model')

const router = express.Router()

// Chức năng thích 1 bài hát, bài hát đó sẽ được thêm vào mảng liked_song (dòng 20)
router.post('/liked', (request, response) => {
    const userId = request.body.userId
    const new_song = request.body.song

    try
    {
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
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

// Nếu bài hát đó đã tồn tại trong danh sách thích, sau khi ấn icon 1 lần nữa, bài hát đó sẽ được gỡ khỏi danh sách đã thích của người dùng
// Nhận vào thông tin của bài hát cùng với id của người dùng
router.post('/remove', (request, response) => {
    const remove_song = request.body.song
    const userId = request.body.userId

    try
    {
        User.findOne({ token: userId }).then(res => {
            if(res)
            {
                res.liked_song = res.liked_song.filter(song => song.track.id !== remove_song.track.id)
    
                res.save(err => {
                    response.status(200).send({ message: 'Success' })
                })
            }else{
                response.status(200).send({ message: 'Failed' })
            }
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

module.exports = router