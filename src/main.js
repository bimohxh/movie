import Vue from 'vue'
import App from './App.vue'
import Home from './components/home.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')
