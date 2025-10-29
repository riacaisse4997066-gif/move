// 引入 Vue 核心和根组件
import { createApp } from 'vue'
import App from './App.vue'

// ① 引入我们待会要写的路由
import router from './router'

// ② 创建应用并挂载路由
const app = createApp(App)

app.use(router)          // 挂上路由
app.mount('#app')        // 挂在 index.html 的 <div id="app"></div>