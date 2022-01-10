require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const socket = require('socket.io')

const User = require('./models/User.model')
const Message = require('./models/Message.model')
const Follow = require('./models/Room.model')

const userRouter = require('./routes/user.route')
const trackRouter = require('./routes/track.route')
const playlistRouter = require('./routes/playlist.route')

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

const port = process.env.PORT || 8000

const server = app.listen(port, () => console.log(`Running on port ${port}`))

const io = socket(server)

io.on('connection', (socket) => {
    socket.emit('connected')
    // User.findOne({_id: userId}).then(result => {
    //     if(result)
    //     {
    //         result.follow_path.forEach(room => {
    //             socket.join(room.id)
    //         });
    //     }
    //     socket.to(result.map(item => item.id)).emit('connected')
    // })
    //inform loged in for everybody

    socket.on('sendMsg', data => {
        console.log(data)
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
})