<template>
  <h2>我的收藏</h2>
  <div v-for="f in favs" :key="f._id" class="card">
    <router-link :to="`/movie/${f.movie._id}`">
      <img :src="f.movie.poster" />
    </router-link>
    <p>{{ f.movie.titleCn }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const favs = ref([])

onMounted(async () => {
  const { data } = await axios.get('/api/favs/me', {
    headers: { Authorization: localStorage.getItem('token') }
  })
  favs.value = data
})
</script>