import request from '@/utils/weather.js'
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
    return response
}, err => {
    nprogress.remove()
    console.log(err)
})

export default function getWhether(config) {
    return request(config)
}