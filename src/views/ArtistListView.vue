<template lang="html">
  <md-layout class="artist-list-view">
    <md-list>
      <md-list-item v-for="artist in artists" :key="artist.userid" class="md-double-line" @click="$router.push({ name: 'Artist', params: { userid: artist.userid }})">
        <md-avatar class="md-avatar-icon">
          <img v-if="artist.usericon" :src="artist.usericon" :alt="artist.username + ' avatar'">
          <md-icon v-else>person</md-icon>
        </md-avatar>

        <div class="md-list-text-container">
          <span>{{ artist.username }}</span>
          <p>{{ deviationsByArtist(artist).length }} wallpapers</p>
        </div>

        <md-ink-ripple></md-ink-ripple>
      </md-list-item>
    </md-list>
  </md-layout>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'artist-list-view',

    computed: {
      ...mapGetters(['artists', 'deviationsByArtist'])
    }
  }
</script>

<style lang="scss">
  .artist-list-view {
    & > .md-list {
      width: 100%;
    }

    & > .md-spinner {
      margin: 0 auto;
    }
  }
</style>
