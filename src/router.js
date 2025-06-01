import { createRouter, createWebHistory } from 'vue-router'
import store from './store'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./views/home.vue'),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('./views/dashboard.vue'),
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
        path: '/case-detail/:id',
        name: 'caseDetail',
        component: () => import('./views/caseDetail.vue'),
        meta: {
            requiresAuth: true
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
    const isRestrictedPageForAuthenticated = to.path === '/login' || to.path === '/register' || to.path === '/'

    if (requiresAuth && !isAuthenticated) {
        next('/login')
    } else if (isRestrictedPageForAuthenticated && isAuthenticated) {
        next('/dashboard')
    } else {
        next()
    }
})

export default router




