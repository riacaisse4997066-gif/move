const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// GET /api/movies  热门电影列表
router.get('/', async (req, res) => {
  const list = await Movie.find().sort({ year: -1 }).limit(20);
  res.json(list);
});
router.get('/:id', async (req, res) => {
  const m = await Movie.findById(req.params.id)
  if (!m) return res.status(404).json({ msg: '电影不存在' })
  res.json(m)
})
module.exports = router;