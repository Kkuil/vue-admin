import Vue from 'vue'
// 封装axios
import axios from 'axios'

const request = axios.create({
    baseURL: 'http://127.0.0.1:3000',  // baseURL
    timeout: 5000,   // timeout
})

export default request