<template>
  <h1>热门电影</h1>
  <div v-for="m in movies" :key="m._id" class="card">
    <router-link :to="`/movie/${m._id}`">
      <img :src="m.poster" alt="海报" />
    </router-link>
    <p>{{ m.titleCn }}（{{ m.year }}）</p>
    <p>★ {{ m.imdbScore }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const movies = ref([])

onMounted(async () => {
  const { data } = await axios.get('/api/movies')
  movies.value = data
})
</script>

<style scoped>
.card {
  display: inline-block;
  margin: 10px;
  width: 200px;
  text-align: center;
}
img {
  width: 100%;
  border-radius: 8px;
}
</style>