<template lang="html">
  <div class="artist-view">
    <am-deviation-list v-if="deviations" :deviations="deviations"></am-deviation-list>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import AmDeviationList from '@/components/DeviationList'

  export default {
    name: 'artist-view',

    components: {
      AmDeviationList
    },

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

    & > .md-spinner {
      margin: 0 auto;
    }
  }
</style>
