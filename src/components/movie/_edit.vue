<template lang="jade">
  div
    // 提交
    template(v-if="step == 'ready'")
      div.item-wrap(v-for="(page, index) in pages")
        div.tool-bar
          span 帧 {{index + 1}}
          a.oper-btn(v-show="pages.length > 1" @click="showDel(page)"): icon(name="cancel")
          a.oper-btn(v-show="pages.length > 1" @click="sortPage(index)"): icon(name="sort")
          a.right(@click="page.isExpand = !page.isExpand"): icon(name="up")
        div(v-show="page.isExpand")
          upload(v-on:upval="getUploadSrc" v-bind:page="page" prefix="movie")
          x-textarea(placeholder="台词多行请回车" v-model="page.words")
        

      confirm(v-model="isShowDel" title="确定删除该帧？" @on-confirm="onDelConfirm")
    
      
      group
        div.add-btn(@click="addPage()")
          icon(name="plus")
          span 添加一帧
      group
        x-input(title="影片名" v-model="mymovie.name" placeholder="不用加 《》")

      group
        x-input(title="演员名" v-model="mymovie.actors" placeholder="多个演员用,隔开")

      group  
        x-textarea(placeholder="请斟酌你独一无二的推荐辞" v-model="mymovie.leads")
      
      div(style="padding: 30px; padding-top: 0;")
        group
          x-button(type="primary" @click.native="submit") 提交
     
    // 提交中   
    template(v-if="step == 'ing'")
      loading(text="提交中" value="true")

    // 完成
    template(v-if="step == 'end'")
      msg(:buttons="okBtns" title="恭喜你，提交成功！"  description="你可以在我的发布中看到该片的状态")

 </template>


<script>
  import { XInput, Group, XTextarea, Panel, Flexbox, FlexboxItem, XButton, Confirm, Loading, Msg  } from 'vux'
  import Upload from '../upload.vue'
  import AV from '../../lib/av'


  // 过滤 leancloud 保留字段
  let filterFields = (fileds) => {
    let filters = ['createdAt', 'updatedAt', 'objectId']
    let obj = {}
    for(let key in fileds) {
      if (filters.indexOf(key) < 0) {
        obj[key] = fileds[key]
      }
    }
    return obj
  }

  export default {
    props: ['movie'],
    data () {
      return {
        isShowDel: false,
        checkedPage: {},
        pages: [{isExpand: true, words: ''}],
        mymovie: {},
        step: 'ready',
        okBtns: [ {
          type: 'default',
          text: '回到首页',
          link: '/'
        }]
      }
    },
    watch: {
      movie: function () {
        this.mymovie = this.movie || {}
        let _pages = this.movie.items || [{isExpand: true, words: []}]
        _pages.forEach(item => {
          item.words = item.words.join('\n')
        })

        this.pages = _pages
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
      Loading,
      Msg 
    },
    methods: {
      addPage: function() {
        this.pages.push({isExpand: true})
      },

      // 排序
      sortPage: function(index) {
        this.pages.splice(index - 1, 0, this.pages.splice(index, 1)[0])
      },

      // 移除一帧
      showDel: function(page) {
        this.checkedPage = page
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

        // 更新
        if (this.mymovie.objectId) {
          movie = AV.Object.createWithoutData('movie', this.mymovie.objectId)
        }

        for(let key in filterFields(this.mymovie)) {
          movie.set(key, this.mymovie[key])
        } 

        this.step = 'ing'
        let _self = this

        movie.save().then((data) => {
          let items = this.pages.map(page => {
            let movieItem = new AV.Object('movie_item')
            
            // 更新
            if (page.objectId) {
              movieItem = AV.Object.createWithoutData('movie_item', page.objectId)
            } else {
              movieItem.set('movie_id', data)  
            }

            for(let key in filterFields(page)) {
              movieItem.set(key, page[key])
            }

            movieItem.set('words', page.words.split(/\n/).filter(item => {return item.length > 0}))

            return movieItem
          })

          AV.Object.saveAll(items).then(() => {
            _self.step = 'end'
          })

        })
      },

      // 获取上传图片地址
      getUploadSrc: function (page, key) {
        page.cover = key
      }
    },
    created() {
      let _self = this
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