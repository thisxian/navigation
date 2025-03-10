import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
const Edit = () => import('@/views/Edit.vue')

const routes = [
    { path: "/", name: 'home', component: Home, },
    { path: '/edit', name: 'edit', component: Edit },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router