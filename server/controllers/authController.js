// 作用：注册/登录的真正逻辑
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 功能：处理“注册”这件事
exports.register = async (req, res) => {
  // 1. 从浏览器送来的“报名表”里，取出三个空格子要填的内容
  const { nick, email, password } = req.body;

  // 2. 先去“用户仓库”翻翻，看有没有谁已经用了这个邮箱
  const exist = await User.findOne({ email });

  // 3. 如果老用户真的存在，告诉浏览器“邮箱已被抢注”，然后直接关门回家
  if (exist) return res.status(409).json({ msg: '邮箱已被注册' });

  // 4. 老用户不存在，开始创建新用户
  // 4.1 把密码换成“密码暗号”（这里先简单用原文，真实项目请用 bcrypt 哈希）
  // 4.2 把新用户卡片插进“用户仓库”
  const user = await User.create({ nick, email, passwordHash: password });

  // 5. 制作一张“7 天临时通行证”
  const token = jwt.sign(
    { uid: user._id },            // 通行证里只放用户编号
    process.env.JWT_SECRET,       // 用环境变量里的密钥签名
    { expiresIn: '7d' }           // 7 天后过期
  );

  // 6. 把通行证和用户公开信息打包成“回信”交给浏览器
  res.json({
    token,                         // 7 天临时通行证
    user: {                        // 对外暴露的用户信息
      _id: user._id,
      nick: user.nick,
      email: user.email
    }
  });

  // 7. 收工！
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
if (!user) return res.status(400).json({ msg: '用户不存在' });
const match = await bcrypt.compare(password, user.passwordHash);
if (!match) return res.status(400).json({ msg: '密码错误' });
const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token, user: { _id: user._id, nick: user.nick, email: user.email } });
};