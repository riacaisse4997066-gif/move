// 作用：让后端能连上 MongoDB 数据库
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ 数据库冰箱已插电~');
  } catch (err) {
    console.error('❌ 数据库没电：', err);
    process.exit(1);
  }
};

module.exports = connectDB;