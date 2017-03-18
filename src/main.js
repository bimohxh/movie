import Vue from 'vue'
import Home from './components/home.vue'
import Pub from './components/pub.vue'
import VueRouter from 'vue-router'
import Icon from 'vue-svg-icon/Icon.vue'
import Footer from './components/footer.vue'

require('normalize.css')
require('./assets/main.css')
require('./assets/form.css')

Vue.component('icon', Icon)
Vue.component('v-footer', Footer)


Vue.use({
  install: function (Vue, options) {
    Vue.prototype.cdn = (src) => {
      return `http://movie.awesomes.cn/${src}`
    }
  }
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
