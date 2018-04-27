<template>
  <div class="search-css">
    <mt-search v-model="value" @click.native="seatch" @keyup.enter.native="seatch"></mt-search>
  </div>

</template>

<script>
  export default {
    name: "s3search",
    data () {
      return {
        value:''
      }

    },
    methods:{
      seatch:function () {
        this.$emit('keySearch', this.value)
      }
    }
  }
</script>

<style>
  /*搜索样式更改*/
  .search-css .mint-searchbar-inner{
    height: 18px;
  }
  .search-css .scroll-header {
    -webkit-transition: top .5s ease;
    transition: top .5s ease;
  }
  .search-css .mint-search{
    margin-top: -1px;
    height: auto;
    -webkit-transition: top .5s ease;
    transition: top .5s ease;
  }
  .search-css .mint-searchbar-cancel{
    color: #fff;
  }
  .search-css .nav-css .mint-cell-title{
    text-align: left;
  }
  .search-css .mint-navbar .mint-tab-item.is-selected{
    margin-bottom: 0;
  }
  .search-css .mint-searchbar{
    background-color: #26a2ff;
  }
</style>
