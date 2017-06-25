import * as mutationType from '@/store/mutation-types'

export default {
  uiToggelSidebar({ state, commit }) {
    if (state.ui.isSidebarOpen) {
      return commit(mutationType.UI_CLOSE_SIDEBAR)
    }
    return commit(mutationType.UI_OPEN_SIDEBAR)
  }
}
