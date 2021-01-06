import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase/firebase'

Vue.config.productionTip = false

let app
auth.onAuthStateChanged(user => {
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

  if(user){
    store.dispatch('auth/fetchUserProfile', user)
  }
})
