<template>

  <div class="card" :class="classes">
    <span v-if="isDue" class="icon has-text-warning">
      <i class="fas fa-star"></i>
    </span>
    <p>{{ item.title }}</p>
    <p class="description" v-if="item.description">{{ item.description }}</p>
  </div>

</template>

<script>

export default {
  props: {
    item: Object
  },

  computed: {
    classes () {
      return {
        'is-due': this.isDue,
        'is-overdue': this.isOverdue,
      }
    },

    date () {
      return this.item.date
    },

    dateLabel () {
      return new Date(this.date)
    },

    isOverdue () {
      return !!this.date && this.date < Date.now()
    },

    isDue () {
      const date = this.date
      const due = date - (1000 * 60 * 60 * 24) * 3
      const now = Date.now()
      return date > now && now > due
    },
  },
}

</script>

<style lang="scss" scoped>
  .card {
    position: relative;
    border-radius: 3px;
    cursor: default;
  }

  .description {
    font-size: 0.7em;
  }

  .icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .is-overdue {
    color: red;
    border: 1px solid red;
  }
</style>
