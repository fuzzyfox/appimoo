<template lang="html">
  <md-card class="am-deviation-card">
    <md-card-media>
      <img :src="deviation.preview.src" :alt="deviation.title" @click="$router.push({ name: 'Deviation', params: { deviationid: deviation.deviationid } })">

      <md-ink-ripple></md-ink-ripple>
    </md-card-media>

    <md-card-header>
      <md-avatar v-if="deviation.author" @click.native="$router.push({ name: 'Artist', params: { userid: deviation.author.userid } })">
        <img v-if="deviation.author.usericon" :src="deviation.author.usericon" :alt="deviation.author.username + ' avatar'">
        <md-icon v-else>person</md-icon>
      </md-avatar>

      <div class="md-title">{{ deviation.title }}</div>
      <div v-if="deviation.author" class="md-subhead" >By: {{ deviation.author.username }}</div>
    </md-card-header>

    <slot></slot>
  </md-card>
</template>

<script>
  export default {
    name: 'am-deviation-card',

    props: {
      deviation: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss">
  .am-deviation-card {
    & > .md-card-header > .md-avatar {
      z-index: 1;
    }
  }
</style>
