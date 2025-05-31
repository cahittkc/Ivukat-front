import { createRouter, createWebHistory } from 'vue-router'
import store from './store'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./views/home.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('./components/login.vue'),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('./components/register.vue'),
        meta: {
            requiresAuth: false
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isAuthenticated = store.getters.getIsAuthenticated
    const isAuthPage = to.path === '/login' || to.path === '/register'

    if (requiresAuth && !isAuthenticated) {
        next('/login')
    } else if (isAuthPage && isAuthenticated) {
        next('/')
    } else {
        next()
    }
})

export default router




