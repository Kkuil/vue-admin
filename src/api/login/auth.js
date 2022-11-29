import request from '@/utils/auth.js'
// nprogress
import nprogress from 'nprogress'

// 请求拦截器
request.interceptors.request.use(config => {
    nprogress.start()
    return config
}, err => {
    nprogress.remove()
    console.log(err)
})

// 响应拦截器
request.interceptors.response.use(response => {
    nprogress.done()
    const localAuth = localStorage.getItem('auth')
    const { auth } = response.headers
    // 本地存储token
    localStorage.setItem('auth', auth)
    return response
}, err => {
    nprogress.remove()
    console.log(err)
})

export default function auth(config) {
    return request(config)
}