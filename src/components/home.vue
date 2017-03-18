<template lang="jade">
  div.swiper-container
    div.swiper-wrapper
    div.swiper-items(style="display: none")
      div.swiper-slide(v-for="movie in movies")
        div.main-view
          div.img-box(v-for="item in movie.items")
            div.cover(:style="'background-image: url(' + cdn(item.cover) + ')'" v-show="item.cover")
            loading(v-show="!item.cover")
            article
              p(v-for="word in item.words") {{word}}
      
          div.opers
            ul
              li
                icon(name="favor")
                span {{movie.favors}}
              li
                icon(name="comment")  
                span {{movie.comments}}  

              // li
              //   span 2340
              //   icon(name="rank") 
                  
              li
                icon(name="share")

              li.tx
                img(:src="movie.author")  
       

</template>


<script> 
  import Swiper from 'swiper'
  
  require('swiper/dist/css/swiper.css')
  import $ from 'jquery'
  import AV from '../lib/av'
  import Loading from './loading'

  var mySwiper

  export default {
    data () {
      return {
        movies: [],
        currentSwiper: 0,
        latestTime: false,
        noMore: false,
        isFirst: true
      }
    },
    components: {
      'loading': Loading
    },
    methods: {
      
      // 获取电影列表
      listMovie: function(mid) {
        if(this.noMore) { return }
        this.loadNext()
        let lastIndex = this.movies.length - 1
        let query = new AV.Query('movie')
        let _self = this
        query.descending('createdAt')
        if (this.latestTime) {
          query.lessThan('createdAt', this.latestTime)
        }
        query.limit(1)
        query.first().then(movie=> {
          if (!movie) {
            _self.noMore = true
            return
          }
          
          let _movie = movie.toJSON()
          _self.latestTime = new Date(_movie.createdAt)
          
          if (_self.isFirst) {
            _self.listMovie()
            _self.isFirst = false
          }
          _self.getMovieItems(movie).then(items => {
            _movie.items = items
            _self.movies.splice(lastIndex, 1, _movie)
          })
        })
      },

      getMovieItems: function (movie) {
        let query = new AV.Query('movie_item')
        query.equalTo('movie_id', movie)
        return new Promise(resolve => {
          query.find().then(items=> {
            resolve(items.map(item => {
              return item.toJSON()
            }))
          })
        })
      },

      // 加载下一张
      loadNext: function () {
        this.movies.push({items: [{cover: undefined, words: undefined}]})
      }
    },
    created() {
      let _self = this
    },
    mounted () {
      let _self = this
      mySwiper = new Swiper ('.swiper-container', {
        onSlideChangeEnd: function (swiper) {
          if (swiper.activeIndex > _self.currentSwiper) {
            _self.listMovie()
          }
          _self.currentSwiper = swiper.activeIndex
        }
      })
      this.listMovie()
    },

    updated () {
      $('.swiper-items .swiper-slide').each(function () {
        mySwiper.appendSlide($(this)[0])
      })
    }
  }
</script>


<style lang="sass">
  body {
    background-color: #fbf9fe;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .main-view {
    padding: 7%;
    font-size: 14px;
    height: 100%;
    padding-bottom: 50px;
    position: relative;
    

    ul {
      padding: 0;
      li {
        list-style: none;
        display: inline-block;
        overflow: hidden;
        margin-right: 10px;
        line-height: 25px;
      }
    }
    .opers {
      width: 100%;
      bottom: 0;
      .svg-icon {
        fill: #DDD;
        margin-right: 6px;
        display: inline-block;
        float: left;
        width: 25px;
        height: 25px;
      }

      .tx {
        float: right;

        img {
          display: inline-block;
          width: 30px;
          height: 30px;
          border-radius: 100%;

        }
      }
    }

    .favors {
      text-align: center;
      padding: 20px 0;
      .svg-icon {
        fill: #DDD;
        width: 50px;
        height: 50px;
      }
    }
  }
  .img-box {
    border-radius: 3px;
    box-shadow: 2px 4px 15px rgba(0, 0, 0, 0.11);
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    height: 100%;
    .cover {
      width: 100%;
      flex-grow:1;
      border-top-right-radius: 3px;
      border-top-left-radius: 3px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
    }

    article {
      padding: 10px;
    }
  }
</style>