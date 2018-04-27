<template>
  <div>
      <mt-navbar :value="selected" >
        <mt-tab-item :id="item.menuUrl" v-for="item in bottomlist" @click.stop.prevent>
          <i class="iconfont icon-chanpin" :class="item.menuIcon"></i>
          <router-link :to="item.menuUrl" tag="div">{{item.menuName}}</router-link>
        </mt-tab-item>
      </mt-navbar>
  </div>
</template>

<script>
  export default {
    name:'s3-bottom',
    props: {
      bottomlist: {
        type: Array,
        default: function () {
          return [
            {menuIcon:'icon-guanxi',menuName:'个人中心',menuUrl:'/profile/info'},
          ]
        }
      },
      selected:{
        type: String,
        default: '/'
      },
    },
    created(){
      this.bottomlist.unshift({menuIcon:'icon-shouye-copy-copy-copy',menuName:'首页',menuUrl:'/'})
    }
  }
</script>

<style scoped>
  .mint-navbar{
    position: fixed;
    z-index: 1;
    width: 100%;
    bottom: 0;
    left: 0;
    height:46px;
  }
  .mint-navbar>.router-link-active span{
    color: #fff;
  }
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 0;
  }
  .mint-navbar .mint-tab-item {
    padding: 7px 0;
    font-size: 15px;
  }
  .mint-navbar .iconfont {
    display: block;
    margin-bottom: 3px;
  }

</style>
