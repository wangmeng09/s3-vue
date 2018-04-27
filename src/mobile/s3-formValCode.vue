<template>
  <div class='s3-changePhone'>

    <div class='formBox'>
      <div class="sendCode">
        <em>|</em>
        <button @click="getValidateCode(phone,loginName)" class="skin-color" :disabled="!isPhoneValid">{{getCodeText}}</button>
      </div>
      <mt-field label="手机号" placeholder="新手机号" type="number" v-model.trim="phone" class="phone" :attr="{required:'required'}"  ></mt-field>
      <mt-field label="验证码" placeholder="输入验证码" type="number" v-model.trim="validatecode" :attr="{required:'required'}"></mt-field>
    </div>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    name:'s3-fromValCode',
    props: {
      loginName: {
        type: String,
        default: ''
      },
    },
    data(){
      return{
        //手机号
        phone:null,
        //验证码
        validatecode:null,
        getCodeText:'获取验证码',
        //倒计时
        count: 60,
      }
    },
    computed: {
      //手机号验证
      isPhoneValid() {
        return /^1[3|5|7|8][0-9]\d{8}$/.test(this.phone);
      },
      appid () {
        return this.$store.state.appid
      }
    },

    methods: {
      getValidateCode:function (phone,loginName) {
        //ajax请求
        var param = {
          mobile:phone,
          appid:this.appid
        }
        if(loginName)
          param.loginName = loginName;

        //显示提示信息
        s3.ajax('/validateCode',param,'usermanage')
        .then( result => {
          if(result.retCode == "200")
            Toast('短信验证码以向您的手机发送，请在输入框内填入您收到的验证码！');
          else
            Toast(result.retMsg||"您的账号暂不能使用忘记密码功能，请联系企业咨询!");
        })

        //点击之后 倒计时
        const f =  () => {
          this.count--;
          this.getCodeText = `请等待 ${this.count} s`;
          if (this.count == 1) {
            this.getCodeText = "获取验证码";
          }
        }
        s3.timer.interval(f,0,1000,60000);
      },


    },
    updated:function () {
        //手机号输入11位
        if(this.phone.length >11)
          this.phone = this.phone.slice(0,11);
    }

  }
</script>

<style>
  .s3-changePhone .formBox{
    position: relative;
  }
  .s3-changePhone .formBox .mint-cell-wrapper input::-webkit-input-placeholder {
    color: #dedede;
  }
  .s3-changePhone .formBox .sendCode {
    width: 100px;
    position: absolute;
    z-index: 1;
    right: 17px;top: 8px;
    font-size: 20px;
  }
  .s3-changePhone .formBox .sendCode em{
    color: #cecece;
    font-style: normal;
  }
  .s3-changePhone .formBox .sendCode button{
    background: transparent;
    border: none;
  }
  .s3-changePhone .formBox .mint-cell:last-child{
     background: #fff;
     border: none;
  }
  .mint-popup-right {
      top: 50.1%;
      -webkit-transform: translate3d(0, -50.1%, 0);
      transform: translate3d(0, -50.1%, 0);
  }

</style>
