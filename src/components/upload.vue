<template lang="jade">
  div
    input(type="file" @change="load")
    div.upload-container
      canvas(v-bind:width="can.width" v-bind:height="can.height")
 </template>


<script>
  import $ from '../assets/jquery-vendor.js'

  require('../assets/load-image/css/vendor/jquery.Jcrop.css')
  //let loadImage = require('../assets/load-image/js/load-image.all.min.js')
  import '../assets/load-image/js/vendor/jquery.Jcrop.js'

  export default {
    data () {
      return {
        pages: [{}],
        can: {
          width: 0,
          height: 0
        }
      }
    },
    components: {
    },
    methods: {
      load: function (event) {
        let _self = this
        
        var fileList = $(event.target)[0].files[0]
        var oFReader = new FileReader()
        oFReader.readAsDataURL(fileList)
        oFReader.onload = function () {
          var img = new Image()
          img.src = oFReader.result
          _self.can.width = img.width
          _self.can.height = img.height

          let canva = $(event.target).parent().find('canvas')[0]
          var createCanvas = canva.getContext("2d");
          
          $(event.target).parent().find('.upload-container').show()
          
          img.onload = function() {
            createCanvas.drawImage(img, 0, 0)
            _self.crop(event)
          }
        }
      },
      crop: function (event) {
        let canva = $(event.target).parent().find('canvas')
        var pixelRatio = window.devicePixelRatio || 1
        canva.Jcrop({
          setSelect: [
            40,
            40,
            100,
            100
          ],
        }).parent().on('click', function (event) {
         
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
    background-color: rgba(0, 0, 0, 0.52);
    z-index: 200;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: none;

  }
</style>