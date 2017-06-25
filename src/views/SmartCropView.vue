<template lang="html">
  <div class="smart-crop-view">
    <img v-if="cropped" :src="cropped" :alt="deviation.name">

    <md-layout>
      <md-spinner v-if="isLoading" md-indeterminate></md-spinner>
    </md-layout>

    <md-speed-dial v-if="!isLoading" md-mode="scale" class="md-fab-bottom-right">
      <md-button class="md-fab" md-fab-trigger>
        <md-icon md-icon-morph>close</md-icon>
        <md-icon>menu</md-icon>
      </md-button>

      <md-button class="md-fab md-mini md-clean" @click="downloadUrl(cropped)">
        <md-icon>file_download</md-icon>
      </md-button>

      <md-button class="md-fab md-mini md-clean" @click="retryCrop()">
        <md-icon>replay</md-icon>
      </md-button>
    </md-speed-dial>

    <div class="debug">
      <ul>
        <li>Has deviation: {{ !!deviation }}</li>
        <li>Has crop canvas: {{ !!cropCanvas }}</li>
        <li>Has crop image: {{ !!image }}</li>
        <li>Has crop promise: {{ !!cropPromise }}</li>
        <li>Error: {{ error ? error.message : 'null' }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import smartcrop from 'smartcrop'
  import sortBy from 'lodash/sortBy'
  import sample from 'lodash/sample'

  import { downloadUrl } from '@/libs/utils'

  export default {
    name: 'smart-crop-view',

    data() {
      return {
        isLoading: true,
        cropped: null,
        error: null,
        image: null,
        results: []
      }
    },

    computed: {
      ...mapGetters(['deviationById']),
      deviation() {
        return this.deviationById(this.$route.params.deviationid)
      },
      sourceUrl() {
        if (!this.deviation) {
          return null
        }

        if (this.deviation.download) {
          return this.deviation.download.src
        }

        if (this.deviation.content) {
          return this.deviation.content.src
        }

        return this.deviation.preview.src
      },
      cropCanvas() {
        return document.createElement('canvas')
      },
      cropPromise() {
        if (!this.deviation || this.cropped) {
          return null
        }

        this.isLoading = true
        this.cropped = null

        const { width, height } = window.screen

        return new Promise((resolve, reject) => {
          this.image = new Image()

          this.image.onload = () => {
            smartcrop
              .crop(this.image, { width, height, debug: true })
              .then(result => {
                this.cropCanvas.width = width
                this.cropCanvas.height = height
                this.cropCanvas
                  .getContext('2d')
                  .drawImage(
                    this.image,
                    result.topCrop.x,
                    result.topCrop.y,
                    result.topCrop.width,
                    result.topCrop.height,
                    0,
                    0,
                    width,
                    height
                  )

                this.isLoading = false
                this.cropped = this.cropCanvas.toDataURL('image/png')
                this.results = sortBy(result.crops, 'score.total').reverse()
              }, reject)
          }

          this.image.crossOrigin = true
          this.image.src = `https://cors-anywhere.herokuapp.com/${this.sourceUrl}`
        }).catch(error => (this.error = error))
      }
    },

    methods: {
      ...mapActions(['loadDeviation', 'loadDeviationDownload']),
      downloadUrl,
      retryCrop() {
        // TODO filter the results down to remove hihgly similar entries
        // const crop = this.results.shift()
        // this.results.push(crop)

        // NOTE this is a slightly silly way to do this but makes visual diffs clear for now
        const crop = sample(this.results)

        const { width, height } = window.screen

        this.cropCanvas.width = width
        this.cropCanvas.height = height

        this.cropCanvas.getContext('2d').clearRect(0, 0, width, height)

        this.cropCanvas
          .getContext('2d')
          .drawImage(
            this.image,
            crop.x,
            crop.y,
            crop.width,
            crop.height,
            0,
            0,
            width,
            height
          )

        this.cropped = this.cropped = this.cropCanvas.toDataURL('image/png')
      }
    },

    created() {
      if (!this.deviation) {
        return this.loadDeviation({
          deviationid: this.$route.params.deviationid
        }).then(() =>
          this.loadDeviationDownload({
            deviationid: this.$route.params.deviationid
          })
        )
      }

      if (!this.deviation.download) {
        this.loadDeviationDownload({
          deviationid: this.$route.params.deviationid
        })
      }
    }
  }
</script>

<style lang="scss">
  .smart-crop-view {
    & > .md-fab-bottom-right {
      position: fixed;
    }

    & > .md-layout > .md-spinner {
      margin: auto;
    }
  }
</style>
