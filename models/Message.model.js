const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    content: String,
    in: mongoose.Schema.Types.ObjectId,
    from: {
        id: String,
        name: String,
    }
})

const Message = mongoose.model('Message', messageSchema, 'message')

module.exports = Message