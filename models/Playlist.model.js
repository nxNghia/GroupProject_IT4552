const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    name: String,
    images: mongoose.Schema.Types.Array,
    tracks: {
        songs: mongoose.Schema.Types.Array,
        total: mongoose.Schema.Types.Number
    },
    owner: mongoose.Schema.Types.Mixed
})

const Playlist = mongoose.model('Playlist', playlistSchema, 'playlist')

module.exports = Playlist