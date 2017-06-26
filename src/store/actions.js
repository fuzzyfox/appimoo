import * as mutationType from '@/store/mutation-types'

export default {
  uiToggelSidebar({ state, commit }) {
    if (state.ui.isSidebarOpen) {
      return commit(mutationType.UI_CLOSE_SIDEBAR)
    }
    return commit(mutationType.UI_OPEN_SIDEBAR)
  },
  uiSetHeaderTitle({ state, commit }, { title } = {}) {
    if (!title) {
      return commit(mutationType.UI_CLEAR_HEADER_TITLE_OVERRIDE)
    }
    return commit(mutationType.UI_SET_HEADER_TITLE_OVERRIDE, { title })
  }
}
