<template lang="html">
  <div class="folder-view">
    <am-deviation-list v-if="deviations" :deviations="deviations"></am-deviation-list>

    <md-spinner v-if="isLoading" md-indeterminate></md-spinner>

    <md-dialog-alert
      :md-content="error ? error.message : 'An unkown error has occured'"
      :md-ok-text="'close'"
      @close="$router.push({ name: 'Folders' })"
      ref="dialog">
    </md-dialog-alert>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  import AmDeviationList from '@/components/DeviationList'

  export default {
    name: 'folder-view',

    components: {
      AmDeviationList
    },

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
      ...mapActions(['loadFolderDeviations', 'uiSetHeaderTitle'])
    },

    created() {
      if (
        !this.folder ||
        (this.folder &&
          (!this.deviations.length || this.deviations.length < this.folder.size))
      ) {
        return this.loadFolderDeviations({
          folderid: this.$route.params.folderid
        })
          .then(() => {
            if (this.folder.name) {
              this.uiSetHeaderTitle({ title: this.folder.name })
            }
          })
          .catch(error => {
            this.error = error
            this.$refs.dialog.open()
          })
      }

      if (this.folder.name) {
        this.uiSetHeaderTitle({ title: this.folder.name })
      }
    }
  }
</script>

<style lang="scss">
  .folder-view {
    padding: 16px;

    & > .md-spinner {
      margin: 0 auto;
    }
  }
</style>
