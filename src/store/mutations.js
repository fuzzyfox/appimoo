import { initAuthState } from './state'
import * as mutationType from './mutation-types'

export const mutations = {
  [mutationType.AUTH_UPDATE](state, auth) {
    state.auth = auth
  },

  [mutationType.UI_OPEN_SIDEBAR](state) {
    state.ui.isSidebarOpen = true
  },
  [mutationType.UI_CLOSE_SIDEBAR](state) {
    state.ui.isSidebarOpen = false
  },

  [mutationType.CLEAR_ALL_DATA](state) {
    state.auth = initAuthState()
  },

  [mutationType.SYNC_STORAGE](state, storageState) {
    Object.assign(state, storageState)
  }
}

export default mutations
