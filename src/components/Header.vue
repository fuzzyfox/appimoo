<template lang="html">
  <md-whiteframe md-elevation="3" class="main-toolbar">
    <md-toolbar>
      <div class="md-toolbar-container">
        <md-button class="md-icon-button" @click="$store.dispatch('uiToggelSidebar')">
          <md-icon>menu</md-icon>
        </md-button>

        <h2 class="md-title">{{ $route.name }}</h2>

        <span style="flex: 1"></span>

        <md-button class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>
      </div>
    </md-toolbar>
  </md-whiteframe>
</template>

<script>
  export default {
    name: 'am-header'
  }
</script>

<style lang="scss">
</style>
