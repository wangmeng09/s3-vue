
import {  Filter,HttpProtptype,Directive,JSLoader,CSSLoader,AsyncComponent,CallbackHook } from '@/global';

import '@/mobile';

const s3vue = function () {}

s3vue.install = function (Vue,options) {
  //component
  Vue.component(CSSLoader.name,CSSLoader)
  Vue.component(JSLoader.name,JSLoader)
  Vue.component(AsyncComponent.name,AsyncComponent)
  Vue.component(s3Search.name,s3Search)
  //prototype
  Vue.prototype.$http = s3.ajax
  Vue.prototype.$hook = CallbackHook.run

  //install
  Vue.install(Filter)
  Vue.install(Directive)
  Vue.install(HttpProtptype)
}
export default s3vue
