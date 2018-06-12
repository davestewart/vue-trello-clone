<template>
  <div id="app">
    <div>
      <h1 class="is-size-3">Tasks</h1>
      <p class="subtitle is-6">Add lists and items by typing in the edit boxes. To enter further details, CMD or CTRL Enter.</p>
    </div>
    <div>
      <board/>
    </div>
  </div>
</template>

<script>
import Board from 'elements/Board'
export default {
  components: {
    Board
  }
}
</script>

<style lang="scss">
  html, body {
    height: 100%;
  }

  body {
    padding: 20px;
  }
</style>
