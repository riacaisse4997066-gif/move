<template>
  <nav>
    <router-link to="/">首页</router-link>
    <span v-if="!user">
      <router-link to="/login">登录</router-link>
      <router-link to="/register">注册</router-link>
    </span>
    <span v-else>
      欢迎 {{ user.nick }}
      <button @click="logout">退出</button>
    </span>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const user = ref(null)

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) return
  const { data } = await axios.get('/api/auth/me', { headers: { Authorization: token } })
  user.value = data
})

<router-link to="/me">我的收藏</router-link>

function logout() {
  localStorage.removeItem('token')
  user.value = null
  location.reload()
}
</script>