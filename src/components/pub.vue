<template lang="jade">
  div
    div.item-wrap(v-for="(page, index) in pages")
      div.tool-bar
        span 帧 {{index + 1}}
        a.oper-btn(v-show="pages.length > 1" @click="showDel(page)"): icon(name="cancel" )
        a.right(@click="isExpand = !isExpand"): icon(name="up")
      div(v-show="isExpand")
        upload
        div.taici(contenteditable="true")
       

    confirm(v-model="isShowDel" title="确定删除该帧？" @on-confirm="onDelConfirm")
   
    
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
  import { XInput, Group, XTextarea, Panel, Flexbox, FlexboxItem, XButton, Confirm  } from 'vux'
  import Upload from './upload.vue'

  export default {
    data () {
      return {
        pages: [{}],
        isShowDel: false,
        checkedPage: {},
        isExpand: true
      }
    },
    components: {
      XInput,
      Group,
      XTextarea,
      Flexbox,
      XButton,
      'upload': Upload,
      FlexboxItem,
      Confirm 
    },
    methods: {
      addPage: function() {
        this.pages.push({})
      },

      // 移除一帧
      showDel: function(page) {
        this.checkedPage = 
        this.isShowDel = page

        
      },

      onDelConfirm: function () {
        var index = this.pages.indexOf(this.checkedPage)
        this.pages.splice(index, 1)  
      }
    },
    created() {
     
    },
    mounted () {
    },

    updated () {
      //$('.taici').html().split(/<[^<>]+>/g).filter(item => {return item.length > 0})
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

  .item-wrap {
    margin: 20px;
    background-color: #FFF;
    box-shadow: 2px 4px 15px rgba(0, 0, 0, 0.11);
    .tool-bar {
      border-bottom: #f5f5f5  1px solid;
      padding: 10px;
      text-align: center;

      .oper-btn {
        float: left
      }
      svg {
        fill: #DDD;
        width: 15px;
        height: 15px;
      }
    }

    .taici {
      padding: 10px;
      border-top: #ecebeb 1px solid;
      outline: none;
      min-height: 100px;
      line-height: 30px;
      position: relative;

      .bg-box {
        position: absolute;
        top: 0;
        width: 100%;
        left: 0;
        text-align: center;
        color: #DDD

      }
    }
  }
</style>