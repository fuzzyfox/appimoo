<template lang="html">
  <div class="debug-view">
    <md-list>
      <md-list-item>
        Environment

        <md-list-expand>
          <pre>{{ environment }}</pre>
        </md-list-expand>
      </md-list-item>

      <md-list-item>
        HTTP

        <md-list-expand>
          <pre>{{ $http.options }}</pre>
        </md-list-expand>
      </md-list-item>

      <md-list-item>
        Auth

        <md-list-expand>
          <pre>{{ $store.state.auth }}</pre>
        </md-list-expand>
      </md-list-item>

      <md-list-item>
        Vuex Stats

        <md-list-expand>
          <pre>{{ vuexStats }}</pre>
        </md-list-expand>
      </md-list-item>

      <md-list-item>
        localStorage

        <md-list-expand>
          <pre>{{ storage }}</pre>
        </md-list-expand>
      </md-list-item>
    </md-list>

    <md-button class="md-raised md-warn" @click="$store.commit('CLEAR_ALL_DATA')">Clear All Data</md-button>
  </div>
</template>

<script>
  import { STORAGE_KEY, SYNCED_NAMESPACES } from '@/store/plugins/localStorage'

  export default {
    name: 'debug-view',

    data() {
      return {
        isSyncing: false,
        environment: process.env,
        storage: {
          STORAGE_KEY,
          SYNCED_NAMESPACES
        }
      }
    },

    computed: {
      vuexStats() {
        return {
          deviations: this.$store.state.deviations.deviations.length,
          folders: this.$store.state.folders.folders.length,
          artists: this.$store.getters.artists.length,
          tags: this.$store.getters.tags.length
        }
      }
    }
  }
</script>

<style lang="scss">
  .debug-view {
    padding: 16px;

    pre {
      max-width: 100%;
      max-height: 400px;
      margin: 16px;
      overflow: auto;
    }
  }
</style>
