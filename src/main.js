import Vue from 'vue'
import Vuex from 'vuex'
import Home from './components/home.vue'
import Pub from './components/movie/pub.vue'
import VueRouter from 'vue-router'
import Icon from 'vue-svg-icon/Icon.vue'
import Footer from './components/footer.vue'
import MovieEdit from './components/movie/edit.vue'
import Movie from './components/movie/movie.vue'
import store from './store'

require('normalize.css')
require('./assets/main.css')
require('./assets/form.css')

Vue.component('icon', Icon)
Vue.component('v-footer', Footer)

Vue.use(Vuex)

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
  },
  {
    path: '/movie/:id',
    component: Movie,
    children: [
      {
        path: 'edit',
        component: MovieEdit
      }
    ]
  }
]

const router = new VueRouter({
  routes
})


new Vue({
  router,
  store
}).$mount('#app')

