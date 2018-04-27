<template>
  <div >
    <mt-header :title="headTitle" fixed  v-if="headTitle">
      <router-link  v-if="showGoBack" slot="left" :to="backState" >
        <mt-button icon="back" ></mt-button>
      </router-link>
      <!--<mt-button  icon="more" slot="right"></mt-button>-->
      <router-link to="/" v-if="goHome" slot="right">
        <mt-button><i class="iconfont icon-shouye-copy-copy-copy"></i></mt-button>
      </router-link>
    </mt-header>
  </div>
</template>

<script>
  export default {
    name:'s3-header',
    props: {
      headTitle:{},
      backState:{
        type: String,
        default:'/'
      },
      goHome:false,
    },
    data () {
      return{
      };
    },
    computed: {
      showGoBack () {
        return this.backState != ''
      }
    }
  }
</script>

<style scoped>
.mint-header-title{
  overflow-y: auto!important;
}
.mint-header.is-fixed {
  z-index: 5;
}
</style>
