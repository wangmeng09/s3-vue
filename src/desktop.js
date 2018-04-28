
import { Filter,Directive,JSLoader,CSSLoader,CallbackHook } from './global';


import s3Login from './desktop/s3-login.vue'
import s3Header from './desktop/s3-header.vue'
import s3Userinfo from './desktop/s3-userinfo.vue'
import s3Role from './desktop/s3-role.vue'


const s3vue = function (Vue,options) {
  //component
  Vue.component(CSSLoader.name,CSSLoader);
  Vue.component(JSLoader.name,JSLoader);
  // Vue.component(AsyncComponent.name,AsyncComponent);
  Vue.component(s3Login.name,s3Login);
  Vue.component(s3Header.name,s3Header);
  Vue.component(s3Userinfo.name,s3Userinfo);
  // Vue.component(s3Role.name,s3Role);


  //prototype
  // Vue.prototype.$http = s3.ajax
  Vue.prototype.$hook = CallbackHook.run;

  //install
  Vue.use(Filter);
  Vue.use(Directive)
}

if(typeof window !== 'undefined' && window.Vue){
  s3vue(window.Vue)
}

module.exports = s3vue
module.exports.default = s3vue

