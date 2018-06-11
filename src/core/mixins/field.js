export default {
  props: {
    name: String,
    value: String,
    label: String,
    error: String
  },

  computed: {
    input: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
