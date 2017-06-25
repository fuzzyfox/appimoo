<template lang="html">
  <md-layout class="folder-view" :md-gutter="16">
    <md-card v-for="deviation in deviations" :key="deviation.deviationid" class="deviation">
      <md-card-media>
        <img :src="deviation.preview.src" :alt="deviation.title" @click="$router.push({ name: 'Deviation', params: { deviationid: deviation.deviationid } })">

        <md-ink-ripple></md-ink-ripple>
      </md-card-media>

      <md-card-header>
        <md-avatar>
          <img v-if="deviation.author.usericon" :src="deviation.author.usericon" :alt="deviation.author.username + ' avatar'">
          <md-icon v-else>person</md-icon>
        </md-avatar>

        <div class="md-title">{{ deviation.title }}</div>
        <div class="md-subhead">By: {{ deviation.author.username }}</div>
      </md-card-header>
    </md-card>

    <md-spinner v-if="isLoading" md-indeterminate></md-spinner>

    <md-dialog-alert
      :md-content="error ? error.message : 'An unkown error has occured'"
      :md-ok-text="'close'"
      @close="$router.push({ name: 'Folders' })"
      ref="dialog">
    </md-dialog-alert>
  </md-layout>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'folder-view',

    data() {
      return { error: null }
    },

    computed: {
      ...mapState({
        folders: state => state.folders.folders,
        isFoldersLoading: state => state.folders.isFoldersLoading
      }),
      ...mapGetters(['folderById', 'deviationById']),
      folder() {
        return this.folderById(this.$route.params.folderid)
      },
      deviations() {
        return this.folder ? this.folder.deviations.map(this.deviationById) : []
      },
      isLoading() {
        if (!this.folder && this.isFoldersLoading) {
          return true
        }

        return this.folder ? this.folder.isLoading : false
      }
    },

    methods: {
      ...mapActions(['loadFolderDeviations'])
    },

    created() {
      if (
        !this.folder ||
        (this.folder &&
          (!this.deviations.length || this.deviations.length < this.folder.size))
      ) {
        this.loadFolderDeviations({
          folderid: this.$route.params.folderid
        }).catch(error => {
          this.error = error
          this.$refs.dialog.open()
        })
      }
    }
  }
</script>

<style lang="scss">
  .folder-view {
    padding: 16px;

    .deviation {
      width: 100%;

      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }

    & > .md-spinner {
      margin: 0 auto;
    }
  }
</style>
