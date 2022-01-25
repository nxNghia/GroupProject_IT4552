require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const socket = require('socket.io')

const User = require('./models/User.model')
const Room = require('./models/Room.model')

const userRouter = require('./routes/user.route')
const trackRouter = require('./routes/track.route')
const playlistRouter = require('./routes/playlist.route')
const roomRouter = require('./routes/room.route')
const genreRouter = require('./routes/genre.route')

const mongoURL = 'mongodb://localhost:27017/soulify'

try {
    mongoose.connect(
        mongoURL,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
}catch {
    console.log('failed')
}

const db = mongoose.connection
db.on('error', console.error.bind(console, 'error:'))
db.once('open', () => {})

app.use(express())
app.use(cors(
    { credentials: true }
))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/user', userRouter)
app.use('/track', trackRouter)
app.use('/playlist', playlistRouter)
app.use('/room', roomRouter)
app.use('/genre', genreRouter)

const port = process.env.PORT || 8000

const server = app.listen(port, () => console.log(`Running on port ${port}`))

const io = socket(server)

let userid_

io.on('connection', (socket) => {
    socket.emit('connected')
    socket.join('common-room')

    socket.on('init', userId => {
        userid_ = userId
        User.findOne({ token: userId })
        .then(result => {
            if (result)
            {
                const rooms = []
                result.follow.forEach(friend => {
                    socket.join(friend.room)
                    rooms.push(friend.room)
                })
                io.to(rooms).emit('online', userId)
            }
        }).catch(e => console.log(e))

    })
    
    socket.on('remove-follow', data => {

    })

    socket.on('create-follow', data => {
        User.findOne({ token: data.userId }).then(result => {
            if (result)
            {
                if (result.being_followed.includes(data.friendId))
                {
                    //ding ding ding we have a match =))
                    socket.join(data.friendId + data.userId)

                    //move being_followId away
                    
                    User.findOne({ token: data.friendId }).then(result2 => {
                        if (result2)
                        {
                            result.being_followed = result.being_followed.filter(id => id !== data.friendId)
                            result2.following = result2.following.filter(id => id !== data.userId)
                            result.follow.push({
                                room: data.friendId + data.userId,
                                friendId: data.friendId,
                                image: result2.images[0].url,
                                name: result2.name
                            })
        
                            const user1 = new Promise((resolve, reject) => {
                                result.save((err, mongoResult) => {
                                    if (err)
                                        reject(err)
                                    else
                                        resolve({
                                            message: 'Success',
                                            user: {
                                                room: mongoResult.room,
                                                friendId: mongoResult.friendId,
                                                image: mongoResult.image,
                                                name: mongoResult.name 
                                            } 
                                        })
                                })
                            })

                            result2.follow.push({
                                room: data.friendId + data.userId,
                                friendId: data.userId,
                                image: result.images[0].url,
                                name: result.name
                            })

                            const user2 = new Promise((resolve, reject) => {
                                result2.save((err, mongoResult) => {
                                    if (err)
                                        reject(err)
                                    else
                                        resolve({
                                            message: 'Success',
                                            user: {
                                                room: mongoResult.room,
                                                friendId: mongoResult.friendId,
                                                image: mongoResult.image,
                                                name: mongoResult.name 
                                            } 
                                        })
                                })
                            })

                            const newContact1 = {
                                room: data.friendId + data.userId,
                                friendId: data.friendId,
                                image: result2.images[0].url,
                                name: result2.name
                            }

                            const newContact2 = {
                                room: data.friendId + data.userId,
                                friendId: data.userId,
                                image: result.images[0].url,
                                name: result.name
                            }

                            return {user1, user2, newContact1, newContact2}
                        }
                    }).then(({user1, user2, newContact1, newContact2}) => {
                        Promise.all([user1, user2]).then(() => {
                            const newRoom = new Room({
                                roomId: data.friendId + data.userId,
                                messages: []
                            })

                            newRoom.save(err => {
                                if (err)
                                    console.log(err)
                                else{
                                    socket.to(data.friendId + data.userId).emit('a-new-match', { message: 'Connected', contact: newContact2 })
                                    socket.emit('a-new-match', { message: 'Connected', contact: newContact1 })
                                }
                            })
                        })
                    })

                }else{
                    // we have a like signal =))
                    User.findOne({ token: data.friendId }).then(result2 => {
                        if (result2)
                        {
                            result2.being_followed.push(data.userId)
                            result2.save(err => {
                                if (err)
                                    console.log(err)
                                else{
                                    result.following.push(data.friendId)
                                    result.save(err => {
                                        if(err)
                                            console.log(err)
                                        else
                                            socket.join(data.userId + data.friendId)
                                    })
                                }
                            })
                        }
                    })
                    io.to('common-room').emit('a-follow-was-created', data)
                }
            }

        }).catch(e => console.log(e))

    })

    socket.on('sendMsg', data => {
        Room.findOne({ roomId: data.room })
        .then(result => {
            if (result)
            {
                result.messages.push({
                    from: data.sender,
                    content: data.content
                })

                result.save(err => {
                    if (err)
                        console.log(err)
                    else
                        io.to(data.room).emit('new-message', {content: data.content, from: data.sender, room: data.room})
                })
            }
        })
    })

    socket.on('receiveMsg', (userId, toRoom, content) => {
        Room.findOne({_id: toRoom}).then(result => {
            if(result)
            {
                result.messages.push({
                    from: userId,
                    content: content
                })

                result.save((err, result) => {
                    if (err) console.log(err)
                    socket.to(toRoom.id).emit('newMsg', result)
                })
            }
        })
    })

    socket.on('disconnecting', () => {
        io.emit('offline', userid_)
    })
})