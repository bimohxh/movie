import Vue from 'vue'
import Home from './components/home.vue'
import VueRouter from 'vue-router'
import Icon from 'vue-svg-icon/Icon.vue'


Vue.component('icon', Icon);

['favor', 'share', 'comment', 'rank'].forEach(item => {
  Icon.inject(item)
})


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
