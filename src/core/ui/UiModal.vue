<template>

  <div class="modal" :class="{'is-active': active}">
    <div class="modal-background" @mousedown="cancel"></div>
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>

</template>

<script>

export default {
  props: {
    active: Boolean,
    cancellable: [Number, Boolean],
  },

  mounted () {
    window.addEventListener('keydown', this.onKeyDown)
  },

  destroyed () {
    window.removeEventListener('keydown', this.onKeyDown)
  },

  methods: {
    cancel () {
      if (this.cancellable) {
        this.close()
      }
    },

    close () {
      this.$emit('close')
    },

    onKeyDown (event) {
      if (event.key === 'Escape') {
        this.cancel()
      }
    }
  }
}

</script>

<style lang="scss">

</style>
