<template lang="jade">
  div
    // 提交
    template(v-if="step == 'ready'")
      div.item-wrap(v-for="(page, index) in pages")
        div.tool-bar
          span 帧 {{index + 1}}
          a.oper-btn(v-show="pages.length > 1" @click="showDel(page)"): icon(name="cancel")
          a.right(@click="page.isExpand = !page.isExpand"): icon(name="up")
        div(v-show="page.isExpand")
          upload
          // div.taici(contenteditable="true" v-model="page.words")
          x-textarea(placeholder="台词多行请回车" v-model="page.words")
        

      confirm(v-model="isShowDel" title="确定删除该帧？" @on-confirm="onDelConfirm")
    
      
      group
        div.add-btn(@click="addPage()")
          icon(name="plus")
          span 添加一帧
      group
        x-input(title="影片名" v-model="movie.name" placeholder="不用加 《》")

      group
        x-input(title="演员名" v-model="movie.actors" placeholder="多个演员用,隔开")

      group  
        x-textarea(placeholder="请斟酌你独一无二的推荐辞" v-model="movie.leads")
      
      group
        x-button(type="primary" @click.native="submit") 提交
     
    // 提交中   
    template(v-if="step == 'ing'")
      loading

    // 完成
    template(v-if="step == 'end'")
      h3 提交成功
 </template>


<script>
  import { XInput, Group, XTextarea, Panel, Flexbox, FlexboxItem, XButton, Confirm  } from 'vux'
  import Upload from './upload.vue'
  import Loading from './loading.vue'
  import AV from '../lib/av'

  export default {
    data () {
      return {
        pages: [{isExpand: true}],
        isShowDel: false,
        checkedPage: {},
        movie: {},
        step: 'ing'
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
      Confirm,
      'loading': Loading
    },
    methods: {
      addPage: function() {
        this.pages.push({isExpand: true})
      },

      // 移除一帧
      showDel: function(page) {
        this.checkedPage = 
        this.isShowDel = page

        
      },

      onDelConfirm: function () {
        var index = this.pages.indexOf(this.checkedPage)
        this.pages.splice(index, 1)  
      },

      // 保存
      submit: function () {
        let Movie = AV.Object.extend('movie')
        let movie = new Movie()
        for(let key in this.movie) {
          movie.set(key, this.movie[key])
        } 

        movie.save().then((data) => {
          let newMovie = AV.Object.createWithoutData('movie', data.objectId)
          let items = this.pages.map(page => {
            let movieItem = new AV.Object('movie_item')
            for(let key in page) {
              movieItem.set(key, page[key])
            }

            movieItem.set('words', page.words.split(/\n/).filter(item => {return item.length > 0}))
            movieItem.set('movie_id', newMovie)
            return movieItem
          })

          AV.Object.saveAll(items).then(() => {
            console.log('成功')
          })

        })
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