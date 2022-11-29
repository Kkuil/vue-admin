import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import user from '@/router/user'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/user/index'
        },
        {
            path: '/user',
            redirect: '/user/index'
        },
        {
            ...user
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login')
        },
        {
            path: '/registry',
            name: 'registry',
            component: () => import('@/views/registry')
        },
        {
            path: '*',
            redirect: '/user/index'
        },
    ]
})

export default router