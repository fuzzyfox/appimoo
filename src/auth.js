import Vue from 'vue'

import store from '@/store'
import { AUTH_UPDATE as AUTH_UPDATE_MUTATION } from '@/store/mutation-types'

/**
 * The endpoint for logging in
 * @type {String}
 */
export const AUTH_URL = process.env.API_ROOT + 'oauth2/token/'

/**
 * Base64 encoded client credentials
 * @type {String}
 */
// prettier-ignore
export const BASE64_CREDENTIALS = btoa(`${process.env.APP_CLIENT_ID}:${process.env.APP_CLIENT_SECRET}`)
/**
 * Options to pass into Vue-Resource http call.
 *
 * Includes the headers to used for login an token refresh calls.
 *
 * @type {Object}
 */
export const AUTH_BASIC_HEADERS = {
  headers: {
    Authorization: `Basic ${BASE64_CREDENTIALS}`
  },
  emulateJSON: true
}

/**
 * Store tokens
 *
 * Update the Vuex store with the access/refresh tokens received from the
 * response from the Oauth2 server.
 *
 * @private
 * @param  {Response} response Vue-Resource Response instance from an OAuth2 server.
 * @return {void}
 */
const _storeToken = response => {
  const auth = { ...store.state.auth }

  auth.isLoggedIn = true
  auth.accessToken = response.body.access_token
  auth.refreshToken = response.body.refresh_token

  store.commit(AUTH_UPDATE_MUTATION, auth)
}

/**
 * Client credentials authentication
 *
 * @return {Promise}
 */
export const authenticate = (() => {
  let _authenticatePromise = null

  return () => {
    if (_authenticatePromise) {
      return _authenticatePromise
    }

    const params = {
      grant_type: 'client_credentials',
      client_id: process.env.APP_CLIENT_ID,
      client_secret: process.env.APP_CLIENT_SECRET
    }

    _authenticatePromise = Vue.http
      .get(AUTH_URL, { ...AUTH_BASIC_HEADERS, params })
      .then(response => {
        _storeToken(response)
        return response
      })

    _authenticatePromise.catch().then(() => (_authenticatePromise = null))

    return _authenticatePromise
  }
})()

export const authPlugin = {
  authenticate,

  /**
   * Install the Auth class.
   *
   * Creates a Vue-Resource http interceptor to handle automatically adding auth
   * headers and refreshing tokens. Then attaches this object to the global Vue
   * (as Vue.auth).
   *
   * @param  {Object} Vue The global Vue.
   * @param  {Object} options Any options we want to have in our plugin.
   * @return {void}
   */
  install(Vue, options) {
    Vue.http.interceptors.push((request, next) => {
      const token = store.state.auth.accessToken
      const hasAuthHeader = request.headers.has('Authorization')

      if (token && !hasAuthHeader) {
        this.setAuthHeader(request)
      }

      next(response => {
        if (response.status === 401) {
          return this.authenticate().then(() => Vue.http(request))
        }
      })
    })

    Vue.prototype.$auth = Vue.auth = this
  },

  /**
   * Set the Authorization header on a Vue-Resource Request.
   *
   * @param  {Request} request The Vue-Resource Request instance to set the header on.
   * @return {void}
   */
  setAuthHeader(request) {
    request.headers.set(
      'Authorization',
      `Bearer ${store.state.auth.accessToken}`
    )
  }
}

export default authPlugin
