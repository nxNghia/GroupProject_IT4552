const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    messages: mongoose.SchemaTypes.Array
})

const Follow = mongoose.model('Follow', followSchema, 'follow')

module.exports = Follow