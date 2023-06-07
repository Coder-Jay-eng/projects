const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const movieSchema = mongoose.Schema({
  moviename: { type: String, required: true },
  actor: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;
