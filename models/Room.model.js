const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    roomId: String,
    messages: mongoose.SchemaTypes.Array
})

const Room = mongoose.model('Room', roomSchema, 'room')

module.exports = Room