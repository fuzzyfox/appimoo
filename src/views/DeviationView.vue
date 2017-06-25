<template lang="html">
  <md-layout class="deviation-view" md-column :md-gutter="8">
    <template v-if="deviation">
      <img :src="deviation.preview.src" :alt="deviation.name">

      <md-layout md-column>
        <div class="md-title">{{ deviation.title }}</div>
        <div class="md-subheading">By: {{ deviation.author.username }}</div>
      </md-layout>
    </template>

    <md-speed-dial v-if="!isLoading && deviation" md-mode="scale" class="md-fab-bottom-right">
      <md-button class="md-fab" md-fab-trigger>
        <md-icon md-icon-morph>close</md-icon>
        <md-icon>menu</md-icon>
      </md-button>

      <md-button class="md-fab md-mini md-clean" @click="$router.push({ name: 'SmartCrop', params: { deviationid: deviation.deviationid } })">
        <md-icon>crop</md-icon>
      </md-button>

      <md-button class="md-fab md-mini md-clean" @click="downloadUrl(deviation.content.src || deviation.preview.src)">
        <md-icon>file_download</md-icon>
      </md-button>
    </md-speed-dial>

    <md-spinner v-if="isLoading" md-indeterminate></md-spinner>
  </md-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  import { downloadUrl } from '@/libs/utils'

  export default {
    name: 'deviation-view',

    data() {
      return {
        isLoading: false
      }
    },

    computed: {
      ...mapGetters(['deviationById']),
      deviation() {
        return this.deviationById(this.$route.params.deviationid)
      }
    },

    methods: {
      ...mapActions(['loadDeviation']),
      downloadUrl
    },

    created() {
      this.loadDeviation({ deviationid: this.$route.params.deviationid })
    }
  }
</script>

<style lang="scss">
  .deviation-view {
    & > .md-layout {
      padding: 8px;
    }

    & > .md-spinner {
      margin: 0 auto;
    }
  }
</style>
