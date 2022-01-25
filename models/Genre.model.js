const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    name: String,
    id: String,
    image: String,
    checked: mongoose.SchemaTypes.Boolean
})

const Genre = mongoose.model('Genre', genreSchema, 'genre')

module.exports = Genre