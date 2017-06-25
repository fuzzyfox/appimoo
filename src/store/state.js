export const initAuthState = () => {
  return {
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null
  }
}

export const initUIState = () => {
  return {
    isSidebarOpen: false
  }
}

export const state = {
  auth: initAuthState(),
  ui: initUIState()
}

export default state
