// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
Vue.use(VueMaterial)

import App from '@/App'
import http from '@/http'
import router from '@/router'
import store from '@/store'

import AuthPlugin from '@/auth'
Vue.use(AuthPlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  http,
  router,
  template: '<App/>',
  components: { App }
})

window.Vue = Vue
