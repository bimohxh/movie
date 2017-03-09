import Vue from 'vue'
import Home from './components/home.vue'
import Pub from './components/pub.vue'
import VueRouter from 'vue-router'
import Icon from 'vue-svg-icon/Icon.vue'

require('normalize.css')
require('./assets/main.css')
require('./assets/form.css')

Vue.component('icon', Icon);

['favor', 'share', 'comment', 'rank', 'edit'].forEach(item => {
  Icon.inject(item)
})


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/pub',
    component: Pub
  }
]

const router = new VueRouter({
  routes
})



const app = new Vue({
  router
}).$mount('#app')
