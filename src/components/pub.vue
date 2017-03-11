<template lang="jade">
  div
    div(v-for="page in pages")
      group(title="台词 + 剧照")
        x-textarea(placeholder="多行请回车")
    
    upload
    group
      div.add-btn(@click="addPage()")
        icon(name="plus")
        span 添加一帧
    group
      x-input(title="影片名" v-model="value" placeholder="不用加 《》")

    group
      x-input(title="演员名" v-model="value" placeholder="多个演员用,隔开")

    group  
      x-textarea(placeholder="请斟酌你独一无二的推荐辞")
    
    group
      x-button(type="primary") 提交
 </template>


<script>
  import { XInput, Group, XTextarea, Panel, Flexbox, FlexboxItem, XButton  } from 'vux'
  import Upload from './upload.vue'

  export default {
    data () {
      return {
        pages: [{}]
      }
    },
    components: {
      'x-input': XInput,
      'group': Group,
      'x-textarea': XTextarea,
      'flexbox': Flexbox,
      'x-button': XButton,
      'upload': Upload,
      'flexbox-item': FlexboxItem
    },
    methods: {
      addPage: function() {
        this.pages.push({})
      }
    },
    created() {
     
    },
    mounted () {
    },

    updated () {
      
    }
  }
</script>


<style lang="sass">
  .add-btn{
    text-align: center;
    padding: 10px;
    svg {
      width: 15px;
      height: 15px;
      fill: #444;
      margin-right: 4px;
    }
  }
</style>