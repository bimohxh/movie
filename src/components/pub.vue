<template lang="jade">
  div
    flexbox(v-for="page in pages")
      flexbox-item(:span="3/4")
        group(title="台词 + 剧照")
          x-textarea(placeholder="多行请回车")
      flexbox-item(:span="1/4")
        //- vue-upload(v-bind:class="['upload-button']" v-bind:crop="true" url="./crop.php" text="上传剧照" extensions="png,gif,jpeg,jpg")
    
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
  import { XInput, Group, XTextarea, Panel, Flexbox, XButton  } from 'vux'

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
      'x-button': XButton
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