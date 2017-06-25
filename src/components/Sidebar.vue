<template lang="html">
  <md-sidenav class="md-left md-fixed" ref="sidebar" :md-swipeable="true" @open="$store.commit(UI_OPEN_SIDEBAR)" @close="$store.commit(UI_CLOSE_SIDEBAR)">
    <md-list>
      <md-list-item @click="click({ name: 'Folders' })" class="md-primary">
        <md-icon>folder</md-icon> <span>Folders</span>
      </md-list-item>

      <md-list-item @click="click({ name: 'Debug' })" class="md-primary">
        <md-icon>settings</md-icon> <span>Debug</span>
      </md-list-item>
    </md-list>
  </md-sidenav>
</template>

<script>
  import { mapState } from 'vuex'

  import { UI_OPEN_SIDEBAR, UI_CLOSE_SIDEBAR } from '@/store/mutation-types'

  export default {
    name: 'am-sidebar',

    computed: {
      ...mapState({
        isOpen: state => state.ui.isSidebarOpen
      }),
      UI_OPEN_SIDEBAR() {
        return UI_OPEN_SIDEBAR
      },
      UI_CLOSE_SIDEBAR() {
        return UI_CLOSE_SIDEBAR
      }
    },

    methods: {
      click(route) {
        if (route) {
          this.$refs.sidebar.$once('close', () => this.$router.push(route))
        }

        this.$refs.sidebar.close()
      }
    },

    watch: {
      isOpen(value) {
        if (value) {
          return this.$refs.sidebar.open()
        }

        this.$refs.sidebar.close()
      }
    }
  }
</script>

<style lang="scss">
</style>
