import Vue from 'vue'
import Vuex from 'vuex'
import breadcrumb from './modules/breadcrumb'
import timeline from './modules/timeline'
import weather from './modules/weather'

Vue.use(Vuex)

const getters = {

}

export default new Vuex.Store({
    modules: {
        breadcrumb,
        timeline,
        weather
    },
    getters
})