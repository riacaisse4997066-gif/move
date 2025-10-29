<template>
  <h2>登录</h2>
  <input v-model="email" placeholder="邮箱" />
  <input v-model="password" type="password" placeholder="密码" />
  <button @click="login">登录</button>
  <p>还没有账号？<router-link to="/register">立即注册</router-link></p>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

async function register() {
  const { data } = await axios.post('/api/auth/login', { email: email.value, password: password.value })
  localStorage.setItem('token', data.token)
  router.push('/')
}
</script>