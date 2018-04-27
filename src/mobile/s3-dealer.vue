<template>
  <div class="s3-popup">
    <div class="page-actionsheet">
      <div class="page-actionsheet-wrapper" @click="popupVisible  = true">
        <i class="iconfont icon-gerenzhongxin skin-color"></i>
        <span >{{currentDealer.userName}}</span>
        <span class="flexCenter"></span>
        <i class="iconfont icon-qiehuan1 skin-color"></i>
      </div>

      <mt-popup v-model="popupVisible" position="right" class="mint-popup mint-popup-dealer"  :modal="false">
        <!--展示当前经销商-->
        <div class="currentBox" >
          <i class="iconfont color-org icon-gerenzhongxin"></i>
          <span class="skin-color">当前经销商：{{currentDealer.userName}}</span>
        </div>
        <!--搜索-->
        <s3-search @keySearch="keySearch"></s3-search>
        <ul class="listUl">
          <li v-for="item in popupList" >
            <div @click="changeDealer(item)">
              <i class="iconfont" :class="{ 'icon-queren skin-color' : currentDealer.customerId ==item.customerId , 'icon-yuanquan': currentDealer.customerId !=item.customerId}"></i>
              <span>{{item.customerId}} {{item.userName}}</span>
            </div>
          </li>
        </ul>
        <mt-button @click.native="popupVisible = false" size="large" type="primary" class="skin-back">关闭 popup</mt-button>
      </mt-popup>

    </div>
  </div>
</template>

<script type="text/babel">

  import s3Search from '@/components/s3-search.vue'
  /**
   * s3-popup
   * @param {string} [currentName] - 展示当前选中的值
   * @param {array} [popupList] - 信息列表
   */
  export default {
    name:'change-popup',
    components: {
      s3Search
    },
    props: {
      //经销商列表
      popupList: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data() {
      return {
        popupVisible : false,
        iconName:'icon-yuanquan'
      };
    },
    computed: {
      //获取当前经销商
      currentDealer () {
        return this.$store.state.currentDealer
      },
    },
    methods: {
      //搜索
      keySearch : function (searchVal) {
        console.log(searchVal)
      },
      //切换经销商
      changeDealer :function (item) {
        //更改currentDealer
        this.$store.commit('setCurrentDealer',item)
      }
    },
    created(){
      let all = {'customerId':undefined,'userName':'全部经销商'};
      this.$store.commit('setCurrentDealer',all)
    },
  };
</script>
<style>
  ul,li{
    padding: 0;margin: 0;
    list-style: none;
  }
  .s3-popup .page-actionsheet-wrapper{
    background-color: #fff;
    box-shadow: 0 1px 0 #dfdfdf;
    -webkit-box-shadow: 0 1px 0 #dfdfdf;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  .s3-popup .page-actionsheet-wrapper >i.iconfont:first-child{
    margin-right: 5px;
  }
  .flexCenter{
    flex:1
  }
  .s3-popup .mint-popup-dealer {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .s3-popup .mint-popup-dealer button {
    margin-top: 200px;
  }
  .s3-popup .currentBox{
    padding: 1rem;
  }
  .s3-popup .currentBox i{
    margin-right: 10px;
  }
  .s3-popup .listUl>li{
    padding: 1rem;
  }
  .s3-popup .listUl>li i{
    margin-right: 10px;
  }
</style>
