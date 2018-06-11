<template>

  <div class="modal" :class="{'is-active': active}">
    <div class="modal-background" @mousedown="$emit('close')"></div>
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>

</template>

<script>

export default {
  props: {
    active: Boolean,
  }
}

</script>

<style lang="scss">

</style>
