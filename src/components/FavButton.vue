<template>
  <button @click="toggle">{{ status === 'wish' ? '已想看' : '想看' }}</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({ movieId: String })
const status = ref('')

onMounted(async () => {
  const { data } = await axios.get(`/api/favs/${props.movieId}`, {
    headers: { Authorization: localStorage.getItem('token') }
  })
  status.value = data.status || ''
})

async function toggle() {
  const newStatus = status.value === 'wish' ? '' : 'wish'
  await axios.post(
    '/api/favs',
    { movieId: props.movieId, status: newStatus },
    { headers: { Authorization: localStorage.getItem('token') } }
  )
  status.value = newStatus
}
</script>