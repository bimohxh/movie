<template lang="jade">
  div.loader-box
    div.csshub-line-spin-fade-loader
      -each val in [1,2,3,4,5,6,7,8]
        div
</template>


<style lang="sass">
  .loader-box {
    text-align: center;
    height: 100px;
  }
  .csshub-line-spin-fade-loader {
    display: inline-block;
    
  }
  @-webkit-keyframes csshub-line-spin-fade-loader {
    50% {
      opacity: 0.3; }
    100% {
      opacity: 1; 
    } 
  }

  @keyframes csshub-line-spin-fade-loader {
    50% {
      opacity: 0.3; 
    }
    100% {
      opacity: 1; 
    } 
  }

  .csshub-line-spin-fade-loader {
    position: relative;
  }

  .csshub-line-spin-fade-loader > div:nth-child(1) {
      top: 20px;
      left: 0;
      -webkit-animation: csshub-line-spin-fade-loader 1.2s -0.84s infinite ease-in-out;
              animation: csshub-line-spin-fade-loader 1.2s -0.84s infinite ease-in-out; }
  
  .csshub-line-spin-fade-loader > div:nth-child(2) {
      top: 13.63636px;
      left: 13.63636px;
      -webkit-transform: rotate(-45deg);
              transform: rotate(-45deg);
      -webkit-animation: csshub-line-spin-fade-loader 1.2s -0.72s infinite ease-in-out;
              animation: csshub-line-spin-fade-loader 1.2s -0.72s infinite ease-in-out; }
  

  .csshub-line-spin-fade-loader > div:nth-child(3) {
      top: 0;
      left: 20px;
      -webkit-transform: rotate(90deg);
              transform: rotate(90deg);
      -webkit-animation: csshub-line-spin-fade-loader 1.2s -0.6s infinite ease-in-out;
              animation: csshub-line-spin-fade-loader 1.2s -0.6s infinite ease-in-out; }
  

  .csshub-line-spin-fade-loader > div:nth-child(4) {
      top: -13.63636px;
      left: 13.63636px;
      -webkit-transform: rotate(45deg);
              transform: rotate(45deg);
      -webkit-animation: csshub-line-spin-fade-loader 1.2s -0.48s infinite ease-in-out;
              animation: csshub-line-spin-fade-loader 1.2s -0.48s infinite ease-in-out; }
  

  .csshub-line-spin-fade-loader > div:nth-child(5) {
      top: -20px;
      left: 0;
      -webkit-animation: csshub-line-spin-fade-loader 1.2s -0.36s infinite ease-in-out;
              animation: csshub-line-spin-fade-loader 1.2s -0.36s infinite ease-in-out; }
  

  .csshub-line-spin-fade-loader > div:nth-child(6) {
      top: -13.63636px;
      left: -13.63636px;
      -webkit-transform: rotate(-45deg);
              transform: rotate(-45deg);
      -webkit-animation: csshub-line-spin-fade-loader 1.2s -0.24s infinite ease-in-out;
              animation: csshub-line-spin-fade-loader 1.2s -0.24s infinite ease-in-out; }
  

  .csshub-line-spin-fade-loader > div:nth-child(7) {
      top: 0;
      left: -20px;
      -webkit-transform: rotate(90deg);
              transform: rotate(90deg);
      -webkit-animation: csshub-line-spin-fade-loader 1.2s -0.12s infinite ease-in-out;
              animation: csshub-line-spin-fade-loader 1.2s -0.12s infinite ease-in-out; }
  
  .csshub-line-spin-fade-loader > div:nth-child(8) {
      top: 13.63636px;
      left: -13.63636px;
      -webkit-transform: rotate(45deg);
              transform: rotate(45deg);
      -webkit-animation: csshub-line-spin-fade-loader 1.2s 0s infinite ease-in-out;
              animation: csshub-line-spin-fade-loader 1.2s 0s infinite ease-in-out; }
  
  .csshub-line-spin-fade-loader > div {
      background-color: #38b7ea;
      width: 4px;
      height: 35px;
      border-radius: 2px;
      margin: 2px;
      -webkit-animation-fill-mode: both;
              animation-fill-mode: both;
      position: absolute;
      width: 5px;
      height: 15px; }
</style>