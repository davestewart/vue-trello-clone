<template>

  <div class="query-form card">
    <div class="card-content">
      <h2 class="title">New task</h2>
      <ui-input ref="title"
                label="Title"
                v-model="title"
                @enter="submit"
      />
      <ui-input ref="description"
                label="Description"
                v-model="description"
                type="textarea"
      />
      <ui-input ref="date"
                label="Date"
                v-model="date"
                type="date"
                @enter="submit"
      />
      <div class="field is-grouped">
        <ui-button @click="submit">Add</ui-button>
        <ui-button type="text" @click="cancel">Cancel</ui-button>
      </div>
    </div>
  </div>

</template>

<script>

function data () {
  return {
    title: '',
    description: '',
    date: null
  }
}

export default {
  data () {
    return data()
  },

  computed: {
    values () {
      return this.$data
    }
  },

  methods: {
    show (data) {
      Object.assign(this, data)
      this.$el.querySelector('input').focus()
    },

    submit () {
      this.$emit('submit', this.values)
      this.reset()
    },

    cancel () {
      this.$emit('cancel', this.values)
      this.reset()
    },

    reset () {
      Object.assign(this, data())
    }
  }
}

</script>

<style lang="scss">

</style>
