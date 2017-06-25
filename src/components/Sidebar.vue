<template lang="html">
  <md-sidenav class="md-left md-fixed" ref="sidebar" :md-swipeable="true" @open="$store.commit(UI_OPEN_SIDEBAR)" @close="$store.commit(UI_CLOSE_SIDEBAR)">
    <md-list>
      <md-list-item @click="click({ name: 'Folders' })" class="md-primary">
        <md-icon>folder</md-icon> <span>Folders</span>
      </md-list-item>

      <md-list-item @click="click()">
        <md-icon>people</md-icon> <span>Shared with me</span>
      </md-list-item>

      <md-list-item @click="click()">
        <md-icon>access_time</md-icon> <span>Recent</span>
      </md-list-item>

      <md-list-item @click="click()">
        <md-icon>start</md-icon> <span>Starred</span>
      </md-list-item>

      <md-list-item @click="click()">
        <md-icon>delete</md-icon> <span>Trash</span>
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
          this.$router.push(route)
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
