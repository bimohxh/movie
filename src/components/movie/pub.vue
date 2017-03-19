<template lang="jade">
  div
    edit
</template>


<script>
  import Edit from './_edit'

  export default {
    components: {
      'edit': Edit 
    },
    methods: {
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