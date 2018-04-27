<template>
  <div>
    <div class="page-cell">
      <a  class="mint-cell" v-for="(item,index) in list">
        <router-link :to='"/"+modules+"/"+item.id'  class="mint-cell" >
          <span class="mint-cell-mask"></span>
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title" style="text-align: left;">
              <i class="iconfont skin-color" :class="icon"></i>
              <span class="mint-cell-text">{{item.id}}</span>
              <i class="iconfont icon-arrow-right"></i>
            </div>
            <div class="mint-cell-value is-link" v-if="showstatus">
              <span style="color: #f37b1d;">{{item.statusName}}</span>
            </div>
            <div class="mint-cell-right"></div>
          </div>
          <div class="mint-cell-content">
            <ul>
              <li>
                <p class="mint-p-list" v-for="(name,index) in modulesconfig">
                  <span>用户名称</span><span>{{item[name]}}</span>
                </p>
              </li>
            </ul>
          </div>
        </router-link>
      </a>

    </div>
  </div>
</template>

<script>
    export default {
      name:'s3-card',
      props: {
        list: {
          type: Array,
          default: function () {
            return []
          }
        },
        modules: {
          type: String,
          default: 'orderlist'
        },
        icon: {
          type: String,
          default:'icon-icon17'
        },
        showstatus:{
          type: Boolean,
          default:false
        },
        detail:{
          type: String,
          default:'detail'
        },
      },
      name: "list",
      data(){
          return{
            modulesconfig:[]
          }
      },
      created(){
        this.modulesconfig = config.modules[this.modules][this.detail];

      },
    }
</script>

<style scoped>
  ul,li{
    list-style: none;
    padding: 0;
  }
  .page-cell{
    font-size: 14px;
  }
  .mint-cell-wrapper{
    border-bottom: 1px dashed #dfdfdf;
  }
  .mint-cell{
    box-shadow: 0 -1px 0 #dfdfdf;
    -webkit-box-shadow: 0 -1px 0 #dfdfdf;
  }

  .mint-cell-value.is-link{
    margin-right: 0;
  }
  .mint-cell-content .mint-p-list{
    display: flex;
    padding: 5px 0;
    color: #999;
  }
  .mint-p-list span{
    flex: 2;
    text-align: left;
    padding: 0 10px;
  }
  .mint-p-list span:nth-child(2){
    text-align: right;
  }
  .color-orange{
    color: #f37b1d;
  }
  .color-red{
    color: #fb3b4e;
  }
</style>
