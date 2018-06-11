<template>

  <div class="ui-item-entry field has-addons">
    <div class="control is-expanded">
      <input class="input" v-model.trim="input" :placeholder="placeholder" @keydown.enter="onEnter"/>
    </div>
    <div class="control" v-if="button">
      <button type="submit" class="button is-primary" @click="onClick" v-html="button"></button>
    </div>
  </div>

</template>

<script>

/**
 * @emits {id, text, more}   enter
 */
export default {
  props: {
    listId: [String, Number],
    placeholder: String,
    button: {
      type: String,
      default: '&hellip;'
    }
  },

  data () {
    return {
      input: ''
    }
  },

  methods: {
    onEnter ($event) {
      this.emit($event.metaKey || $event.ctrlKey)
    },

    onClick () {
      this.emit(true)
    },

    emit (more) {
      if (this.input) {
        this.$emit('enter', {
          id: this.listId,
          text: this.input,
          more
        })
        this.input = ''
      }
    }
  }
}

</script>

<style lang="scss">
  .ui-item-entry {
    margin: 5px;
  }
</style>
