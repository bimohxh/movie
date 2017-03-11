<template lang="jade">
  div.upload-box
    input(type="file" @change="uploadChange")
    div.upload-container
      img(:src="srcData")
      div.canvas-wraper

      div.upload-opers
        a(@click="uploadAct"): icon(name="cancel")
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
        srcData: ''
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
        canva.Jcrop({
          setSelect: [
            40,
            40,
            100,
            100
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
      complete: function () {
        // this.srcData = can.toDataURL()
        console.log(cutDara)
        // can.height = can.height; 
        // crop.destroy()
        // $(can).css('width',  cutDara.w + 'px')
        // $(can).css('height', cutDara.h + 'px') 

        this.load({w: cutDara.w, h:  cutDara.h}, [cutDara.x, cutDara.y, cutDara.w, cutDara.h, 0, 0,  cutDara.w, cutDara.h])
        // can.getContext("2d").drawImage(uploadImg, cutDara.x, cutDara.y, cutDara.w, cutDara.h, 0, 0,  cutDara.w, cutDara.h)
      },

      // 上传
      uploadAct: function () {
        let data = can[0].toDataURL()
        data = data.split(',')[1]
        data = window.atob(data)
        let ia = new Uint8Array(data.length)
        for (let i = 0; i < data.length; i++) {
            ia[i] = data.charCodeAt(i)
        }
        let blob = new Blob([ia],{type:"image/png", endings:'transparent'})
        let fd = new FormData()
        console.log(blob)
        fd.append('avatarFile', blob, 'image.png')
        let httprequest=new XMLHttpRequest()
        httprequest.open('POST', '/guest/avatar', true)
        httprequest.send(fd)
        httprequest.onreadystatechange= function () {
          if(httprequest.status==200 && httprequest.readyState==4){
              console.log(httprequest.responseText);
              $('#returnImg').attr('src','/images/'+JSON.parse(httprequest.responseText).json);
          }
        }
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
    
    .canvas-wraper {
      display: flex;
      align-items: center;
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
</style>