<template lang="jade">
  div
    div.main-view
      div.img-box
        img.cover(src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488620620841&di=c444d0c8ee06b292d2adb5556becf5e3&imgtype=0&src=http%3A%2F%2Fimage2.sina.com.cn%2Fent%2Fd%2Fw%2F2007-05-23%2FU1513P28T52D852F872DT20070523190638.jpg")
        article
          p 曾经有一份真挚的爱摆在我的面前
          p 我没有珍惜
          p 等到失去了才后悔莫及
          p 尘世中最痛苦的事莫过于此

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
           
          
 </template>


<script>
  
  require('normalize.css')
  require('../assets/main.css')
  export default {
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>


<style lang="sass">
  body {
    background-color: rgba(250, 250, 250, 0.22);
  }
  .main-view {
    padding: 3%;
    font-size: 14px;

    ul {
      padding: 0;
      li {
        list-style: none;
        display: inline-block;
      }
    }
    .opers {
      .svg-icon {
        fill: #DDD;
        margin-right: 20px;
        display: inline-block;
      }
    }
  }
  .img-box {
    border-radius: 3px;
    border: 1px solid rgba(0,0,0,.09);
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.04);
    background-color: #FFF;
    .cover {
      width: 100%
    }

    article {
      padding: 10px;
    }
  }
</style>