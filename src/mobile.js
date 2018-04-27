
import { Filter,Directive,JSLoader,CSSLoader,CallbackHook } from './global';


import s3Search from   './mobile/s3-search.vue'
import s3Banner from './mobile/s3-banner.vue'
import s3Bottom from './mobile/s3-bottom.vue'
import s3Card from  './mobile/s3-card.vue'
const s3vue = function () {}

s3vue.install = function (Vue,options) {
  //component
  Vue.component(CSSLoader.name,CSSLoader)
  Vue.component(JSLoader.name,JSLoader)
  // Vue.component(AsyncComponent.name,AsyncComponent)
  Vue.component(s3Search.name,s3Search)
  Vue.component(s3Banner.name,s3Banner)
  Vue.component(s3Bottom.name,s3Bottom)
  Vue.component(s3Card.name,s3Card)
  //prototype
  // Vue.prototype.$http = s3.ajax
  Vue.prototype.$hook = CallbackHook.run

  //install
  Vue.use(Filter)
  Vue.use(Directive)
}
export default s3vue
