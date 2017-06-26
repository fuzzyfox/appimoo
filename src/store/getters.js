import router from '@/router'

export default {
  headerTitle: state => state.ui.headerTitleOverride || router.currentRoute.name
}
