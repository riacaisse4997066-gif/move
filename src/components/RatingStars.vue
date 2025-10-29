<template>
  <span>
    <span
      v-for="i in 5"
      :key="i"
      @click="rate(i)"
      :class="{ active: i <= score }"
      >★</span
    >
  </span>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps({ movieId: String })
const score = ref(0)

async function rate(i) {
  await axios.post(
    '/api/rating',
    { movieId: props.movieId, score: i },
    { headers: { Authorization: localStorage.getItem('token') } }
  )
  score.value = i
}
</script>

<style scoped>
span { cursor: pointer; font-size: 20px; color: #ccc; }
.active { color: #f7ba2a; }
</style>