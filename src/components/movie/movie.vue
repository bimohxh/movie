<template lang="jade">
  div
    router-view
</template>


<script>
  export default {
    data () {
      return {
        movie: {}
      }
    },
    components: {
    },
    methods: {
    },
    created() {
      let _self = this
      this.$store.dispatch('initMovie', this.$route.params.id).then(() => {
      })
    },
    mounted () {
    },
    updated () {
    }
  }
</script>