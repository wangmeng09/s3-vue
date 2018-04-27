<template>
  <div class="changeCompany">
    <div class="page-actionsheet">
      <div class="page-actionsheet-wrapper" @click="sheetVisible = true">
        <i class="iconfont icon-gongsi skin-color"></i>
        <span >{{currentName}}</span>
        <span class="flexCenter"></span>
        <i class="iconfont icon-qiehuan1 skin-color"></i>
      </div>
      <mt-actionsheet :actions="actionList" v-model="sheetVisible"></mt-actionsheet>
    </div>
  </div>
</template>

<script type="text/babel">
  /**
   * s3-action
   * @param {string} [currentName] - 展示当前选中的值
   * @param {array} [actionList] - 信息列表
   */
  export default {
    name:'s3-action',
    props: {
      actionList: {
        type: Array,
        default: function () {
          return []
        },
        required: true
      },
      currentName:{
        type:String
      },
      /*changeList:{
        type:Function
      }*/
    },
    data() {
      return {
        sheetVisible: false
      };
    },
    computed: {
      /*companyList(){
        this.actionList.forEach(item => {
          item.method = this.changeList;
          item.name = item.companyName;
        });
        return this.actionList;
      }*/
    }
  };
</script>
<style>
  .page-actionsheet-wrapper{
    background-color: #fff;
    box-shadow: 0 1px 0 #dfdfdf;
    -webkit-box-shadow: 0 1px 0 #dfdfdf;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  .page-actionsheet-wrapper >i.iconfont:first-child{
    margin-right: 5px;
  }
  .flexCenter{
    flex:1
  }
</style>
