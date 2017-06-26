<template lang="html">
  <div class="tag-view">
    <am-deviation-list v-if="deviations" :deviations="deviations"></am-deviation-list>

    <md-dialog-alert
      :md-content="error ? error.message : 'An unkown error has occured'"
      :md-ok-text="'close'"
      @close="$router.push({ name: 'Folders' })"
      ref="dialog">
    </md-dialog-alert>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  import AmDeviationList from '@/components/DeviationList'

  export default {
    name: 'tag-view',

    components: {
      AmDeviationList
    },

    data() {
      return { error: null }
    },

    computed: {
      ...mapGetters(['deviationsByTagName']),
      deviations() {
        return this.deviationsByTagName(this.$route.params.tagName)
      }
    },

    methods: {
      ...mapActions(['uiSetHeaderTitle'])
    },

    created() {
      this.uiSetHeaderTitle({ title: `Tag: ${this.$route.params.tagName}` })
    }
  }
</script>

<style lang="scss">
  .tag-view {
    padding: 16px;

    & > .md-spinner {
      margin: 0 auto;
    }
  }
</style>
