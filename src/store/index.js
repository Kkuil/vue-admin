import Vue from 'vue'
import Vuex from 'vuex'
import breadcrumb from './modules/breadcrumb'
import weather from './modules/weather'

Vue.use(Vuex)

const getters = {

}

export default new Vuex.Store({
    modules: {
        breadcrumb,
        weather
    },
    getters
})