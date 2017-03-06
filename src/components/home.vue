<template lang="jade">
  div.swiper-container
    div.swiper-wrapper
      div.swiper-slide(v-for="item in items")
        div.main-view
          div.img-box
            img.cover(:src="item.cover")
            article
              p(v-for="txt in item.text") {{txt}}
          // div.favors
          //   icon(name="favor")
          //   div 30234
          div.opers
            ul
              li
                icon(name="favor")
                span 21
              li
                icon(name="comment")  
                span 324  
              li
                icon(name="share")

              li.tx
                img(:src="item.author")  
           
          
 </template>


<script>
  require('normalize.css')
  require('../assets/main.css')
  import Swiper from 'swiper'
  require('swiper/dist/css/swiper.css')
  import $ from 'jquery'

  export default {
    data () {
      return {
        items: [
          {
            cover: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488620620841&di=c444d0c8ee06b292d2adb5556becf5e3&imgtype=0&src=http%3A%2F%2Fimage2.sina.com.cn%2Fent%2Fd%2Fw%2F2007-05-23%2FU1513P28T52D852F872DT20070523190638.jpg",
            author: "https://awesomes.oss-cn-beijing.aliyuncs.com/mem/170107150059-97-1.jpg",
            text: ['曾经有一份真挚的爱摆在我的面前',  '我没有珍惜',  '等到失去了才后悔莫及', '尘世中最痛苦的事莫过于此']
          },
          {
            cover: "http://img0.imgtn.bdimg.com/it/u=1134862582,1051897568&fm=23&gp=0.jpg",
            author: "https://awesomes.oss-cn-beijing.aliyuncs.com/mem/170107150059-97-1.jpg",
            text: ['我怕你找不到我嘛']
          },
          {
            cover: "http://img4.imgtn.bdimg.com/it/u=3318983394,679068676&fm=23&gp=0.jpg",
            author: "https://awesomes.oss-cn-beijing.aliyuncs.com/mem/170107150059-97-1.jpg",
            text: ['想完整']
          },
          {
            cover: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488805721458&di=f4b1447ecf37171957db27757b6a0200&imgtype=0&src=http%3A%2F%2Fimg.tuku.cn%2Ffile_thumb%2F201504%2Fm2015040414515003.jpg",
            author: "https://awesomes.oss-cn-beijing.aliyuncs.com/mem/170107150059-97-1.jpg",
            text: ['没有啊', '天亮过后就会很美']
          }
        ]
      }
    },
    mounted () {
      var mySwiper = new Swiper ('.swiper-container', {
        loop: true
      })
      $('.swiper-slide').each(function () {
        $(this).find('.cover').height($(this).find('.main-view').height() - $(this).find('article').height() -50)   
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
    padding-top: 50px;
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
    .cover {
      width: 100%;
      border-top-right-radius: 3px;
      border-top-left-radius: 3px;
    }

    article {
      padding: 10px;
    }
  }
</style>