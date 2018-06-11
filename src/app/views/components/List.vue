<template>

  <div>
    <h2>{{ title }}</h2>
    <div class="cards">
      <card v-for="card in cards"
            :key="card.id"
            :data="card"
      />
    </div>
  </div>

</template>

<script>
import Card from 'components/Card'

export default {
  components: {
    Card
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    cards: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style lang="scss">

</style>
