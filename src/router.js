import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/login.vue'
import Home from './views/home.vue'
const routes = [
  { path: '/', name : "Home", component: () => import('./views/home.vue') },
  { path: '/login', name : "Login", component : () => import('./components/login.vue') },
  {path :'/register', name : "Register", component: () => import('./components/register.vue')},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router




