// 作用：厨房大门打开，开始接客
require('dotenv').config();              // 先把钥匙拿进来
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();                              // 插电冰箱

app.use(cors());
app.use(express.json());

// 挂上地址
app.use('/auth', require('./routes/auth'));

// 兜底错误处理
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ msg: '服务器开小差' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ 厨房门口已打开：http://localhost:${PORT}`));
app.use('/api/movies', require('./routes/movies'));