<template lang="jade">
  div
    edit(:movie="movie")
</template>


<script>
  import Edit from './_edit'

  export default {
    data () {
      return {
        // movie: this.$store.state.movie.movie
      }
    },
    computed: {
      movie () {
        return this.$store.state.movie.movie
      }
    },
    components: {
      'edit': Edit 
    },
    methods: {
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