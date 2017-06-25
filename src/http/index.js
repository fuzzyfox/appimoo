import Vue from 'vue'
import VueResoure from 'vue-resource'

Vue.use(VueResoure)

Vue.http.options.root = process.env.API_ROOT + 'api/v1/oauth2/'

export default {
  root: process.env.API_ROOT
}
