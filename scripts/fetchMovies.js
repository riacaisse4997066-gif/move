// scripts/fetchMovies.js
require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const Movie = require('../server/models/Movie');

const fetchPages = 10;   // 先抓 5 页 ≈ 100 部

async function fetchBatch(page) {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=zh-CN&page=${page}`;
  const { data } = await axios.get(url);
  return data.results.map(m => ({
    tmdbId: m.id,
    titleCn: m.title,
    titleEn: m.original_title,
    year: new Date(m.release_date).getFullYear(),
    poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
    summary: m.overview,
    genres: m.genre_ids.map(id => id.toString()),
    imdbScore: m.vote_average
  }));
}

async function seed() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('🌍 已连本地库');
  for (let p = 1; p <= fetchPages; p++) {
    const list = await fetchBatch(p);
    // 先忽略已存在的 tmdbId
await Movie.bulkWrite(
  list.map(doc => ({
    updateOne: {
      filter: { tmdbId: doc.tmdbId },
      update: { $setOnInsert: doc },
      upsert: true
    }
  }))
);
    await Movie.insertMany(list, { ordered: false, rawResult: true });
    console.log(`📄 第 ${p} 页入库完成`);
  }
  console.log('✅ 全部抓完！');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});