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
        Vuex

        <md-list-expand>
          <pre>{{ $store.state }}</pre>
        </md-list-expand>
      </md-list-item>

      <md-list-item>
        localStorage

        <md-list-expand>
          <pre>{{ storage }}</pre>
        </md-list-expand>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  import { STORAGE_KEY, SYNCED_NAMESPACES } from '@/store/plugins/localStorage'

  export default {
    name: 'debug-view',

    data() {
      return {
        environment: process.env,
        storage: {
          STORAGE_KEY,
          SYNCED_NAMESPACES
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
