<template>

  <div class="control">
    <button type="button"
            :class="`button is-${type}`"
            @click="$emit('click')"
            v-bind="$attrs"
    >
      <slot></slot>
    </button>
  </div>

</template>

<script>

export default {
  props: {
    type: {
      type: String,
      default: 'button'
    }
  }
}

</script>

<style lang="scss">

</style>
