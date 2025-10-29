<template>
  <h1>热门电影</h1>
  <div v-for="m in movies" :key="m._id" class="card">
    <img :src="m.poster" alt="" />
    <p>{{ m.titleCn }} ({{ m.year }})</p>
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
.card { display: inline-block; margin: 10px; width: 200px; }
img { width: 100%; }
</style>