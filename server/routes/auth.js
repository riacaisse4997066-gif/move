// 作用：把注册/登录的地址挂出来
const express = require('express');
const router = express.Router();
const { celebrate, Joi, Segments } = require('celebrate');
const authController = require('../controllers/authController');

// 注册地址：POST /auth/register
router.post('/register', celebrate({
  [Segments.BODY]: Joi.object({
    nick: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })
}), authController.register);

// 登录地址：POST /auth/login
router.post('/login', celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })
}), authController.login);

module.exports = router;