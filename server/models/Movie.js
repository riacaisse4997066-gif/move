// 作用：规定“电影”长啥样
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  tmdbId: { type: Number, unique: true },
  titleCn: String,
  titleEn: String,
  year: Number,
  poster: String,
  summary: String,
  genres: [String],
  directors: [{ name: String, avatar: String }],
  casts: [{ name: String, avatar: String }],
  imdbScore: Number,
  trailer: String
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);