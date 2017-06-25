<template lang="html">
  <md-layout class="deviation-view" md-column :md-gutter="8">
    <template v-if="deviation">
      <img :src="deviation.preview.src" :alt="deviation.name">

      <md-layout md-column>
        <div class="md-title">{{ deviation.title }}</div>
        <div class="md-subheading">By: {{ deviation.author.username }}</div>
      </md-layout>
    </template>

    <md-spinner v-if="isLoading" md-indeterminate></md-spinner>
  </md-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

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
      ...mapActions(['loadDeviation'])
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
