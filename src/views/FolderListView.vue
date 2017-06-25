<template lang="html">
  <md-layout class="folder-list-view">
    <md-list>
      <md-list-item v-for="folder in folders" :key="folder.folderid" class="md-double-line" @click="$router.push({ name: 'Folder', params: { folderid: folder.folderid }})">
        <md-avatar class="md-avatar-icon">
          <md-icon>folder</md-icon>
        </md-avatar>

        <div class="md-list-text-container">
          <span>{{ folder.name }}</span>
          <p>{{ folder.size }} wallpapers</p>
        </div>
      </md-list-item>
    </md-list>

    <md-spinner v-if="isLoading" md-indeterminate></md-spinner>
  </md-layout>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'folder-list-view',

    computed: {
      ...mapState({
        folders: state => state.folders.folders,
        isLoading: state => state.folders.isFoldersLoading
      })
    },

    methods: {
      ...mapActions(['loadFolders', 'loadAllFolders'])
    },

    created() {
      if (!this.folders.length) {
        this.loadAllFolders()
      }
    }
  }
</script>

<style lang="scss">
  .folder-list-view {
    & > .md-list {
      width: 100%;
    }

    & > .md-spinner {
      margin: 0 auto;
    }
  }
</style>
