const express = require('express')

const router = express.Router()

const Room = require('../models/Room.model')
const User = require('../models/User.model')

// Trả về danh sách bạn bè của người dùng (cả hai đã follow nhau), cùng với nội dung tin nhắn của từng follow
// Nhận vào id của người dùng
router.get('/:userId', (request, response) => {
    const userId = request.params.userId

    const follows = []

    try
    {
        User.findOne({ token: userId }).then(result => {
            if (result)
            {
                result.follow.forEach(follow => {
                    const room_instance = new Promise((resolve, reject) => {
                        Room.findOne({ roomId: follow.room }).then(result => {
                            if (result)
                            {
                                resolve(result)
                            }else{
                                reject(result)
                            }
                        })
                    })
            
                    follows.push(room_instance)
                });
            
                Promise.all(follows).then((result = []) => response.status(200).send({ message: 'Success', data: result }))
            }
        })    
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

module.exports = router