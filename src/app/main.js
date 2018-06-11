import Vue from 'vue'
import VeeValidate from 'vee-validate'
import 'bulma'

import App from './App.vue'

import 'styles/index.scss'
import 'core/ui'

// config
Vue.config.productionTip = false

// plugins
Vue.use(VeeValidate)

// application
const app = new Vue({
  render: h => h(App)
}).$mount('#app')

// debugging
if (process.env.NODE_ENV === 'development') {
  window.app = app
}
