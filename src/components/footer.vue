<template lang="jade">
  footer
    tabbar
      tabbar-item(link="/")
        icon(name="home" slot="icon")
        span(slot="label") 首页
      
      tabbar-item(link="/pub")
        icon(name="plus" slot="icon")
        span(slot="label") 发布   
        
      tabbar-item
        icon(name="user" slot="icon")
        span(slot="label") 我的  

</template>


<script> 
  import { Tabbar, TabbarItem } from 'vux'
  export default {
    data () {
    },
    components: {
      Tabbar,
      TabbarItem
    }
    
  }
</script>


<style lang="sass">
  footer {
    height: 50px;
    flex-shrink:0
  }

  .weui-tabbar__item {
    text-decoration: none;
  }
  .weui-tabbar__label {
    padding: 0;
    margin: 0;
  }

  .weui-tabbar__icon svg {
    width: 20px;
    height: 20px;
  }

  .weui-tabbar__icon {
    width: auto!important;
    height: auto!important
  }

  .weui-tabbar {
    position: relative!important
  }
</style>