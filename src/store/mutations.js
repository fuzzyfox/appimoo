import { initAuthState } from './state'
import { initState as initFoldersState } from './modules/folders'
import { initState as initDeviationssState } from './modules/deviations'
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
  [mutationType.UI_SET_HEADER_TITLE_OVERRIDE](state, { title }) {
    state.ui.headerTitleOverride = title
  },
  [mutationType.UI_CLEAR_HEADER_TITLE_OVERRIDE](state) {
    state.ui.headerTitleOverride = null
  },

  [mutationType.CLEAR_ALL_DATA](state) {
    state.auth = initAuthState()
    state.folders = initFoldersState()
    state.deviations = initDeviationssState()
  },

  [mutationType.SYNC_STORAGE](state, storageState) {
    Object.assign(state, storageState)
  }
}

export default mutations
