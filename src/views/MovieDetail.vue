<template>
  <div v-if="movie" class="detail">
    <img :src="movie.poster" alt="海报" />
    <h1>{{ movie.titleCn }}（{{ movie.year }}）</h1>
    <p>★ {{ movie.imdbScore }}</p>
    <p>{{ movie.summary }}</p>

    <!-- ① 引入的组件必须先在 <script> 里 import -->
    <RatingStars :movieId="movie._id" />
    <FavButton :movieId="movie._id" />

    <router-link to="/">← 返回首页</router-link>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
// ② 先引入组件
import RatingStars from '../components/RatingStars.vue'
import FavButton from '../components/FavButton.vue'

const route = useRoute()
const movie = ref(null)

onMounted(async () => {
  const { data } = await axios.get(`/api/movies/${route.params.id}`)
  movie.value = data
})
</script>

<style scoped>
.detail {
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
}
img {
  width: 300px;
  border-radius: 8px;
}
</style>