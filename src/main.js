import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import "./plugins/vuetify-mask.js";

import mixins from './mixins/mixins'
Vue.mixin(mixins)

Vue.config.productionTip = false

new Vue({
  axios,
  VueAxios,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
