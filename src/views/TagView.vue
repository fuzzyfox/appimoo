<template lang="html">
  <div class="tag-view">
    <md-card v-for="deviation in deviations" :key="deviation.deviationid" class="deviation">
      <md-card-media>
        <img :src="deviation.preview.src" :alt="deviation.title" @click="$router.push({ name: 'Deviation', params: { deviationid: deviation.deviationid } })">

        <md-ink-ripple></md-ink-ripple>
      </md-card-media>

      <md-card-header>
        <div class="md-title">{{ deviation.title }}</div>
      </md-card-header>

      <md-card-actions>
        <md-button class="md-icon-button">
          <md-icon>favorite</md-icon>
        </md-button>

        <md-button class="md-icon-button">
          <md-icon>bookmark</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>

    <md-dialog-alert
      :md-content="error ? error.message : 'An unkown error has occured'"
      :md-ok-text="'close'"
      @close="$router.push({ name: 'Folders' })"
      ref="dialog">
    </md-dialog-alert>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'tag-view',

    data() {
      return { error: null }
    },

    computed: {
      ...mapGetters(['deviationsByTagName']),
      deviations() {
        return this.deviationsByTagName(this.$route.params.tagName)
      }
    },

    created() {}
  }
</script>

<style lang="scss">
  .tag-view {
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
