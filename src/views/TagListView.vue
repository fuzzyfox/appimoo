<template lang="html">
  <md-layout class="tag-list-view">
    <md-list>
      <md-list-item v-for="tag in tags" :key="tag" @click="$router.push({ name: 'Tag', params: { tagName: tag } })">
        <md-avatar class="md-avatar-icon">
          <md-icon>label</md-icon>
        </md-avatar>

        <div class="md-list-text-container">
          <span>{{ tag }}</span>
          <p>{{ deviationsByTagName(tag).length }} wallpapers</p>
        </div>
      </md-list-item>
    </md-list>
  </md-layout>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'tag-list-view',

    computed: {
      ...mapGetters(['tags', 'deviationsByTagName'])
    }
  }
</script>

<style lang="scss">
  .tag-list-view {
    & > .md-list {
      width: 100%;
    }
  }
</style>
