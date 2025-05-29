import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/login.vue'
import Home from './views/home.vue'
const routes = [
  { path: '/', name : "Home", component: Home },
  { path: '/login', name : "Login", component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router




