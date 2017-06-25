<template lang="html">
  <md-layout class="artist-view" :md-gutter="16">
    <md-card v-for="deviation in deviations" :key="deviation.deviationid" class="deviation">
      <md-card-media>
        <img :src="deviation.preview.src" :alt="deviation.title" @click="$router.push({ name: 'Deviation', params: { deviationid: deviation.deviationid } })">

        <md-ink-ripple></md-ink-ripple>
      </md-card-media>

      <md-card-header>
        <md-avatar>
          <img v-if="artist.usericon" :src="artist.usericon" :alt="artist.username + ' avatar'">
          <md-icon v-else>person</md-icon>
        </md-avatar>

        <div class="md-title">{{ deviation.title }}</div>
        <div class="md-subhead">By: {{ artist.username }}</div>
      </md-card-header>
    </md-card>
  </md-layout>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'artist-view',

    computed: {
      ...mapGetters(['deviationsByArtist']),
      deviations() {
        return this.deviationsByArtist({ userid: this.$route.params.userid })
      },
      artist() {
        if (!this.deviations) {
          return null
        }

        return this.deviations[0].author
      }
    }
  }
</script>

<style lang="scss">
  .artist-view {
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
