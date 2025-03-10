import { createApp } from 'vue'
import App from './App.vue'
import './index.css'             // tailwind CSS 
import router from '@/router'    // 路由
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // pinia数据持久化
import './assets/iconfont/iconfont.css' // 阿里图标库

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
