<template>
  <div id="app">
    <am-sidebar></am-sidebar>

    <am-header></am-header>

    <router-view class="main-content"></router-view>
  </div>
</template>

<script>
  import AmSidebar from '@/components/Sidebar'
  import AmHeader from '@/components/Header'

  export default {
    name: 'app',

    components: {
      AmSidebar,
      AmHeader
    }
  }
</script>

<style lang="scss">
  @import '~vue-material/dist/vue-material.css';

  html,
  body,
  #app {
    height: 100%;
    overflow: hidden;
  }

  #app {
    display: flex;
    flex-flow: column;
  }

  .main-content {
    position: relative;
    z-index: 1;
    overflow: auto;
  }
</style>
