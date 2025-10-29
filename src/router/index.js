import { createRouter, createWebHistory } from 'vue-router'

// ① 引入页面组件
import MovieList from '../views/MovieList.vue'
import MovieDetail from '../views/MovieDetail.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserCenter from '../views/UserCenter.vue'   // ✅ 补引入

const routes = [
  { path: '/', name: 'MovieList', component: MovieList },
  { path: '/movie/:id', name: 'MovieDetail', component: MovieDetail },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/me', name: 'UserCenter', component: UserCenter }   // ✅ 补路由
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router