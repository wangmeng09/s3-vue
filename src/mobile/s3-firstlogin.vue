<template>
  <div class="s3-firstLogin">
    <div class="first-login-tig">
      <p>首次登录请先绑定你的手机号码</p>
      <p>并修改密码</p>
    </div>
    <div class="formBox">
      <s3-formvalcode ref="formvalcode" :loginName = "user.UserEntityloginName"></s3-formvalcode>
      <mt-field label="旧密码" placeholder="请输入你的旧密码" type="password" v-model.trim="oldPassword" :attr="{ maxlength: 16,minlength:8 }"></mt-field>
      <mt-field label="新密码" placeholder="请输入你的新密码" type="password" v-model.trim="newPassword" :attr="{ maxlength: 16,minlength:8 }"></mt-field>
      <mt-field label="确认密码" placeholder="请再次确认您的新密码" type="password" v-model.trim="repeatPassword" :attr="{ maxlength: 16,minlength:8 }"></mt-field>
    </div>
    <div class="buttonBox">
      <mt-button type="primary" size="large" class="loginBtn skin-back"   @click.native="changePassword" :disable='newPassword && newPassword !== repeatPassword && oldPassword ==""' >确认</mt-button>
    </div>
    <!--表单验证-->
    <div class="errorBox">
      <div v-if="newPassword && !passwordValidate"> 请输入为8-16位新密码，必须包含数字、大写字母、小写字母、特殊字符这四种类型中的两种</div>
      <div v-if="repeatPassword && newPassword !== repeatPassword">两次密码不一致</div>
    </div>

   <div class='warningBox'>
      <p class='notice-txt'>温馨提示</p>
      <p class=''>请将密码设置为8（含）位以上，必须包含数字、大写字母、小写字母、特殊字符这四种类型中的两种</p>
      <p class=''>为了保护您的账户的安全请不要将密码设置为其他网站相同的密码；</p>
      <p class=''>建议您每隔一段时间修改您的密码，以防密码泄露。</p>
    </div>
  </div>
</template>

<script>

  import { MessageBox } from 'mint-ui';
  import s3Formvalcode from '@/components/s3-formValCode.vue'

  export default {
    name:'s3-firstlogin',
    components: {s3Formvalcode},
    props:{
      success: {
        type: String,
        default: '/home'
      }
    },
    data(){
      return{
        validatecode:null,
        oldPassword:'',
        newPassword:'',
        repeatPassword:''
      }
    },
    computed: {
      user () {
        return this.$store.state.currentUser || {UserEntityloginName:''}
      },
      appid () {
        return this.$store.state.APPID
      },
      //验证密码
      passwordValidate: function() {
        return /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![@#$%^&]+$)[0-9A-Za-z@#$%^&]{8,16}$/.test(this.newPassword)
      }

    },
    methods: {
      changePassword: function(event){
        let self = this

        var getPublicKey = function() {
          return new Promise((resolve,reject) => {
            let param = {
              appid: self.appid
            }
            s3.ajax('/publicKey',param,'usermanage').then(result => {
              if(result.retCode == '200') {
                resolve(result)
              } else {
                reject(result)
              }
            })
          })
        }

        //此处进行密码加密 + ajax调用
        getPublicKey()
        .then(data => {
          let oldPassword = s3.RSAEncrypt(data.modulus,data.exponent,self.oldPassword)
          let newPassword = s3.RSAEncrypt(data.modulus,data.exponent,self.newPassword)
          let confirmPassword = s3.RSAEncrypt(data.modulus,data.exponent,self.repeatPassword)


          let param = {
            oldPassword:oldPassword,
            newPassword:newPassword,
            confirmpassword:confirmPassword,
            mobile:self.$refs.formvalcode.phone,
            validateCode:self.$refs.formvalcode.validatecode
          }
          return s3.ajax('/firstLogin',param,'usermanage')
        })
        .then(result=>{
          if(result.retCode && result.retCode == "200"){
            self.$store.commit('USER_FIRST_LOGIN',false)
            self.$store.commit('USER_LOG_IN')
            s3.istore.set('USER_LOG_IN',true)
            self.$store.dispatch('getUserState')
            self.$router.push(self.success)
          }else{
            MessageBox.alert(result.retMsg,'出错了')
          }
        })
      }
    }
  }
</script>

<style >
  .s3-firstLogin{
    height: 100vh;
    background: #f2f2f2;
    overflow: auto;
  }
  .s3-firstLogin .first-login-tig{
    width:100%;
    padding: .5rem 1rem;
    box-sizing: border-box;
  }
  .s3-firstLogin .formBox{
    position: relative;
  }
  .s3-firstLogin .formBox .mint-cell-wrapper input::-webkit-input-placeholder {
    color: #dedede;
  }
  .s3-firstLogin .buttonBox{
    padding: 2rem 1.6rem 1.2rem;
  }
  .s3-firstLogin .warningBox{
    padding: 1rem 1.6rem ;
  }
  .s3-firstLogin .warningBox p{
    margin: 0;
  }
  .s3-firstLogin .errorBox>div{
    margin: 0 1.6rem .5rem ;
    padding: .5rem 1rem;
    background: #ffb499;
    color: #fff;
    border-radius: 4px;
  }
</style>
