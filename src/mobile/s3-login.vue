<template>
  <transition class="animated" enter-active-class="slideInUp" enter-leave-class="slideOutDown" mode = "out-in">
    <div>
      <div  class="loginBox">
        <div class="container">
          <img class="logo" alt="s3core" :src="logo" />
          <div>{{company}}</div>
          <form v-if="!isLoggedIn">
            <input type="text" placeholder="请输入用户名" v-model="loginName" required maxlength="30"/>
            <input type="password" placeholder="请输入密码" v-model="password" required maxlength="16"/>
            <a href="#">忘记密码?</a>
            <mt-button type="primary" size="large" class="loginBtn skin-back" @click="doLogin">登录</mt-button>
          </form>
          <div class="signup">
            <p><span>{{fullyear}}</span> <span >{{company}}</span>版权所有</p>
          </div>
        </div>
      </div>
      <mt-popup v-model="showFirstLogin" position="right">
        <s3-firstLogin :success="success"></s3-firstLogin>
      </mt-popup>
  </div>
  </transition>
</template>

<script>
import { MessageBox } from 'mint-ui';
import s3FirstLogin from './s3-firstlogin.vue'

export default {
  name:'s3-login',
  props:{
    company: {
      type: String,
      default:'核心企业电子供应链平台'
    },
    logo:{
      type: String,
      default:'http://file.gongyinju.com/group1/M00/00/5B/bQYdm1mH6MCARxkxAABfhUPd7bM324.jpg'
    },
    success: {
      type: String,
      default: '/'
    }
  },
  data(){
    return{
      loginName:'',
      password:''
    }
  },
  computed: {
    fullyear () {
      return new Date().getFullYear()
    },
    appid () {
      return this.$store.state.APPID
    },
    isLoggedIn () {
      return this.$store.getters.USER_LOG_IN
    },
    user () {
       return this.$store.state.currentUser || {UserEntityloginName:''}
    },
    showFirstLogin: {
      get: function(){
        return !!this.$store.state.USER_FIRST_LOGIN
      },
      set: function(){
        this.$store.commit('USER_FIRST_LOGIN',this.showFirstLogin)
      }
    }
  },
  methods: {
    doLogin () {
      let self = this

      if (this.loginName == ''){
        MessageBox('提示', '用户名不能为空');
        return false
      }
      if (this.password == ''){
        MessageBox('提示', '密码名不能为空');
        return false
      }

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

      getPublicKey()
      .then(data => {
        let pwd = s3.RSAEncrypt(data.modulus,data.exponent,self.password)
        let param = {
          loginName: self.loginName,
          password: pwd,
          appid: self.appid
        }
        return s3.ajax('/login',param,'usermanage')
      })
      .then(result => {
        if (result.retCode === '200'){
          self.$store.commit('USER_LOG_IN')
          if (result.isFirstLogin === false) {
            let firstLoginFlag = true;
            self.$store.commit('USER_FIRST_LOGIN',firstLoginFlag)
          } else {
            self.$store.dispatch('getUserState');
            self.$router.push(self.success)
          }
        } else {
          MessageBox.alert('提示', result.retMsg ||result.retmsg )
        }
      })
      .catch(error => {
        throw new Error(error)
      })
    }
  },
  components:{
    s3FirstLogin
  }
}
</script>

<style scoped>
  .loginBox .container {
    position: relative;
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
  }

  .loginBox .container img.logo {
    display: block;
    margin: 0 auto;
    width: 100px;
    padding: 60px 0 10px 0;
  }
  .loginBox .container img.logo~div{
    text-align: center;
    margin : 16px  0 30px 0;
  }

  .loginBox .container a {
    text-decoration: none;
    color: inherit;
  }

  .loginBox .container input[type="text"] {
    padding: 16px;
    border-radius: 4px 4px 0 0;
    background: transparent;
    border: 1px solid #CFD0D1;
    display: block;
    margin: 0 auto;
    width: 75%;
  }

  .loginBox .container input[type="password"] {
    padding: 16px;
    border-radius: 0 0 4px 4px;
    border: 1px solid #CFD0D1;
    border-top: none;
    background: transparent;
    display: block;
    margin: 0 auto;
    margin-bottom: 12px;
    width: 75%;
  }

  .loginBox .container .loginBtn {
    display: block;
    margin: 0 auto;
    margin-top: 12px;
    width: 80%;
    color: white;
    text-transform: uppercase;
    font-weight: 700;
  }

  .loginBox .container form a{
    display: block;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 28px;
    text-align: right;
    color: #5B5A5A;
  }

  .loginBox .container  div.signup {
    text-align: center;
    width: 100%;
    position: absolute;
    bottom:0;
  }

  .loginBox .container div.signup p {
    padding: 0px;
    margin: 4px 0px;
  }
  .loginBox .container .errorBox div{
    width: 80%;
    text-align: left;
    margin: auto;
    margin-bottom: .5rem;
  }
  .loginBox .container .errorBox div>i{
    margin: 0 .2rem 0 0;
  }
</style>
