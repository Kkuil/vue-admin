import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'  // element-ui
import Cookies from 'js-cookie'
import moment from "moment";
import enLang from 'element-ui/lib/locale/lang/en'// 中文语言包
import echarts from 'echarts'  // echarts
import VueLazyload from 'vue-lazyload'
import router from '@/router/index'  // vue-router
import store from '@/store/index'
import '@/font/font'
import '@/styles/index.scss' // global css
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import './styles/element-variables.scss'
import '@/font/font.css'
import 'nprogress/nprogress.css'
import '@/styles/animate.scss'
import 'qweather-icons/font/qweather-icons.css'

// element-ui 配置
Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})

//注册图片懒加载  
Vue.use(VueLazyload, {
  error: '@/assets/images/error.png',
  loading: '@/assets/images/loading.gif',
  attempt: 3
})


Vue.use(ElementUI)

Vue.config.productionTip = false
// port
Vue.prototype.$port = location.port

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$moment = moment
    Vue.prototype.$echarts = echarts
  }
})