const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    token: String,
    name: String,
    follow: mongoose.SchemaTypes.Array,
    follow_path: mongoose.SchemaTypes.Array,
    liked_song: mongoose.SchemaTypes.Array
})

const User = mongoose.model('User', userSchema, 'user')

module.exports = User