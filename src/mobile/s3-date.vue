<template>
  <span>
    {{dateFormat}}
  </span>
</template>

<script>
  export default {
    name:'s3-date',
    props:{
      date: {
        required: true
      },
      fmt: {
        type: String,
        default:'yyyy-MM-dd'
      },
    },
    data() {
      return {

      };
    },
    computed: {
      dateFormat () {
        return  new Date(this.date).format(this.fmt)
      }
    },

  }
</script>

<style scoped>

</style>
