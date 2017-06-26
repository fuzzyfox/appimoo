<template lang="html">
  <div class="am-deviation-list">
    <am-deviation-card
      v-for="deviation in deviations"
      :key="deviation.deviationid"
      :deviation="deviation">
    </am-deviation-card>
  </div>
</template>

<script>
  import AmDeviationCard from '@/components/DeviationCard'

  export default {
    name: 'am-deviation-list',

    components: {
      AmDeviationCard
    },

    props: {
      deviations: {
        type: [Array, Object],
        required: true
      }
    }
  }
</script>

<style lang="scss">
  .am-deviation-list {
    & > .am-deviation-card {
      margin-bottom: 16px;
    }
  }
</style>
