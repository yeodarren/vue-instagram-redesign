import Vue from 'vue'
import Vuex from 'vuex'
import authModules from './modules/auth/index'
import globalModules from './modules/global/index'
import postsModules from './modules/posts/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: authModules,
    global: globalModules,
    posts: postsModules
  }
})
