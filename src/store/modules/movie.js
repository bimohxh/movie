import AV from '../../lib/av'


// 获取movie items
const getMovieItems = (movie) => {
  let query = new AV.Query('movie_item')
  query.equalTo('movie_id', movie)
  return new Promise(resolve => {
    query.find().then(items => {
      resolve(items.map(item => {
        return item.toJSON()
      }))
    })
  })
}

const state = {
  movie: {}
}

// getters
const getters = {
}

// actions
const actions = {

  // 初始化获取 movie
  initMovie ({ commit, state }, mid) {
    let query = new AV.Query('movie')
    return new Promise(resolve => {
      query.get(mid).then(movie => {
        let _movie = movie.toJSON()
        getMovieItems(movie).then(items => {
          _movie.items = items
          commit('initMovie', _movie)
          resolve()
        })
      })
    })
  }
}

// mutations
const mutations = {
  initMovie (state, movie) {
    state.movie = movie
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
