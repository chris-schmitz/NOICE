<template>
  <div class='activator-container' @click="activate">
    <slot></slot>
  </div>
</template>

<script>
  import {ipcRenderer} from 'electron'

  export default {
    props: ['wordId', 'activationKey'],
    data () {
      return {}
    },
    methods: {
      activate () {
        ipcRenderer.send('activate', {type: 'letter-activation', wordId: this.wordId, activationKey: this.activationKey})
      },
      handleSuccessfulActivation () {
        console.log('activation complete ;)')
      }
    },
    created () {
      ipcRenderer.on('activation-complete', this.handleSuccessfulActivation)
    }
  }
</script>

<style lang='scss' scoped>
  .activator-container{}
</style>
