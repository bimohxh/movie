<template lang="jade">
  div.upload-box
    div.upload-btn
      div(v-show="uploadAct.state == 'ready'")
        icon(name="upload")
        p 剧照
        input.upload-file(type="file" @change="uploadChange")
      div(v-show="uploadAct.state == 'ing'")  
        img(:src="uploadAct.result")
    div.upload-container
      img(:src="srcData")
      div.canvas-wraper

      div.upload-opers
        a(@click="cancel"): icon(name="cancel")
        a(@click="switchCut"): icon(name="cut" v-bind:class="'active-' + iscut")
        a(@click="complete"): icon(name="ok")
 </template>


<script>
  import $ from '../assets/jquery-vendor.js'

  require('../assets/load-image/css/vendor/jquery.Jcrop.css')
  import '../assets/load-image/js/vendor/jquery.Jcrop.js'
  import Switch from './switch'
  import { XButton, Group } from 'vux'

  let outer;
  let crop;
  let can;
  let uploadImg
  let uploadFile
  let cutDara = {}
  let canwrap
  export default {
    data () {
      return {
        pages: [{}],
        iscut: false,
        srcData: '',
        uploadAct: {
          state: 'ready',
          result: ''
        }
        
      }
    },
    components: {
      'x-button': XButton,
      'x-switch': Switch,
      'group': Group
    },
    methods: {
      // 选择上传图片  初始化
      uploadChange: function (event) {
        let _self = this
        outer =  $(event.target).closest('.upload-box')
        var fileList = $(event.target)[0].files[0]
        var oFReader = new FileReader()
        oFReader.readAsDataURL(fileList)
        oFReader.onload = function () {
          var img = new Image()
          img.src = oFReader.result
          uploadImg = img
          uploadImg.onload = function() {
             _self.load({}, [0, 0])
          }
        }
      },

      // 加载图片
      load: function (canArgs, cutArgs) {
        canArgs = canArgs || {}
        let _self = this
        let canwrap = outer.find('.canvas-wraper')
        canwrap.empty()
        can = $('<canvas>')
        canwrap.append(can)
        can.attr('width',  canArgs.w ||  uploadImg.width)
        can.attr('height', canArgs.h ||  uploadImg.height)


        var createCanvas = can[0].getContext("2d")
        
        outer.find('.upload-container').show()
        cutArgs.unshift(uploadImg)
        createCanvas.drawImage.apply(createCanvas, cutArgs)

        can.css('max-width', '100%')
        can.css('max-height', '100%')
      },

      // 剪切
      cut: function (event) {
        let canva = $(event.target).closest('.upload-container').find('canvas')
        var pixelRatio = window.devicePixelRatio || 1
        let _w = parseInt(canva.width() * 2 / 3)
        let _h = parseInt(canva.height() * 2 / 3)
        canva.Jcrop({
          setSelect: [
            parseInt((canva.width() - _w) / 2),
            parseInt((canva.height() - _h) / 2),
            _w,
            _h
          ],
          allowSelect: false,
          onChange: (c) => {
            cutDara = c
          }
        }, function () {
          crop = this
        })
      },

      // 切换剪切
      switchCut: function (event) {
        if (this.iscut) {
          crop.release()
        } else {
          this.cut(event)
        }
        this.iscut = !this.iscut
      },

      // 取消
      cancel: function (event) {
        $(event.target).closest('.upload-container').hide()
        $(event.target).closest('.upload-box').find('input[type=file]').val('')  
        crop.release()
        this.iscut = false
      },

      // 完成
      complete: function (event) {
        if (this.iscut){
          this.cutAct()
        }

        this.uploadAct.state = 'ing'
        this.uploadAct.result = can[0].toDataURL()
        this.cancel(event)
        // this.uploadGo()
      },
 

      // 剪切完成
      cutAct: function () {
        let canva = $(event.target).closest('.upload-container').find('canvas')
        let rate_x =  uploadImg.width  * 1.00 / canva.width()
        let rate_y = uploadImg.height  * 1.00 /  canva.height()
        this.load({w: cutDara.w * rate_x, h:  cutDara.h * rate_y}, [cutDara.x * rate_x, cutDara.y * rate_y, cutDara.w * rate_x, cutDara.h * rate_y, 0, 0,  cutDara.w * rate_x, cutDara.h * rate_y])
      },


      // 上传
      uploadGo: function () {
        let data = can[0].toDataURL()
        data = data.split(',')[1]
        data = window.atob(data)
        let ia = new Uint8Array(data.length)
        for (let i = 0; i < data.length; i++) {
            ia[i] = data.charCodeAt(i)
        }
        let blob = new Blob([ia],{type:"image/png", endings:'transparent'})
        let fd = new FormData()
       
        
        $.get('http://movie-api.leanapp.cn/api/uptoken', (data) => {
          fd.append('file', blob, data.filename)
          fd.append('key', data.filename)
          fd.append('token', data.token)
          let httprequest=new XMLHttpRequest()

          httprequest.open('POST', 'http://up.qiniu.com/', true)
          httprequest.send(fd)
          httprequest.onreadystatechange= function () {
            if(httprequest.status==200 && httprequest.readyState==4){
                console.log(httprequest.responseText);
                $('#returnImg').attr('src','/images/'+JSON.parse(httprequest.responseText).json);
            }
          }
        })
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
  .upload-container {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.99);
    z-index: 200;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: none;
    padding-bottom: 80px;
    padding-top: 50px;
    
    .canvas-wraper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .upload-opers {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 10px 0;
      text-align: center;

      svg {
        margin: 0 20px;

        &.active-true {
          fill: #FF8708
        }
      }
    }
  }

  .upload-btn {
    text-align: center;
    position: relative;
    padding: 20px;

    .upload-file {
      display: block;
      position: absolute;
      width: 100%;
      top: 0;
      height: 100%;
      top: 0;
      opacity: 0;
    }

    img {
      width: 100%
    }
    
  }
</style>