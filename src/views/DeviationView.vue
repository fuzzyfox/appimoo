<template lang="html">
  <md-layout class="deviation-view" md-column :md-gutter="8">
    <template v-if="deviation">
      <img :src="deviation.preview.src" :alt="deviation.name">

      <div class="wallpaper-metadata">
        <md-avatar>
          <img v-if="deviation.author.usericon" :src="deviation.author.usericon" :alt="deviation.author.username + ' avatar'">
          <md-icon v-else>person</md-icon>
        </md-avatar>

        <div class="wallpaper-details">
          <div class="md-title">{{ deviation.title }}</div>
          <div class="md-subhead">By: {{ deviation.author.username }}</div>
        </div>
      </div>

      <div class="wallpaper-metadata md-column">
        <div v-if="deviation.license" class="license"><strong>License:</strong> {{ deviation.license }}</div>
        <div v-if="deviation.tags && deviation.tags.length">
          <md-chip v-for="tag in deviation.tags" :key="tag.tag_name">{{ tag.tag_name }}</md-chip>
        </div>
      </div>
    </template>

    <md-speed-dial v-if="!isLoading && deviation" md-mode="scale" class="md-fab-bottom-right">
      <md-button class="md-fab" md-fab-trigger>
        <md-icon md-icon-morph>close</md-icon>
        <md-icon>menu</md-icon>
      </md-button>

      <md-button class="md-fab md-mini md-clean" @click="$router.push({ name: 'SmartCrop', params: { deviationid: deviation.deviationid } })">
        <md-icon>crop</md-icon>
      </md-button>

      <md-button class="md-fab md-mini md-clean" @click="downloadUrl(sourceUrl)">
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
      },
      sourceUrl() {
        if (!this.deviation) {
          return null
        }

        if (this.deviation.download) {
          return this.deviation.download.src
        }

        if (this.deviation.content) {
          return this.deviation.content.src
        }

        return this.deviation.preview.src
      }
    },

    methods: {
      ...mapActions([
        'loadDeviation',
        'loadDeviationMetadata',
        'loadDeviationDownload'
      ]),
      downloadUrl
    },

    created() {
      const deviationid = this.$route.params.deviationid

      if (!this.deviation) {
        return this.loadDeviation({ deviationid })
          .then(() => this.loadDeviationDownload({ deviationid }))
          .then(() => this.loadDeviationMetadata({ deviationid }))
      }

      if (!this.deviation.download) {
        this.loadDeviationDownload({ deviationid })
      }

      if (!this.deviation.tags) {
        this.loadDeviationMetadata({ deviationid })
      }
    }
  }
</script>

<style lang="scss">
  .deviation-view {
    & > .md-layout {
      padding: 8px;
    }

    .wallpaper-metadata {
      display: flex;
      padding: 8px 16px;

      & > .md-avatar {
        flex: 0 0 auto;
        margin-right: 16px;
      }

      & > .wallpaper-details {
        flex: 1 1 auto;
      }

      & > .license {
        margin-bottom: 8px;
      }
    }

    & > .md-spinner {
      margin: 0 auto;
    }
  }
</style>
