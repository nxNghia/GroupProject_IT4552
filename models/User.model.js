const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    token: String,
    name: String,
    follow: mongoose.SchemaTypes.Array,
    following: mongoose.SchemaTypes.Array,
    liked_song: mongoose.SchemaTypes.Array,
    follow_playlists: mongoose.SchemaTypes.Array,
    being_followed: mongoose.SchemaTypes.Array,
    images: mongoose.SchemaTypes.Array,
    blocked: mongoose.SchemaTypes.Boolean,
    reported: mongoose.SchemaTypes.Boolean
})

const User = mongoose.model('User', userSchema, 'user')

module.exports = User