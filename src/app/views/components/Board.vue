<template>
  <div class="board-container">
    <div class="board">

      <Container
        lock-axis="x"
        orientation="horizontal"
        drag-handle-selector=".list-drag-handle"
        @drop="onListDrop"
      >
        <Draggable v-for="list in lists" :key="list.id">
          <section class="list-container" ref="list">

            <div class="list-header">
              <span class="list-drag-handle">&#x2630;</span>
              {{ list.title }}
            </div>

            <Container
              group-name="list"
              drag-class="card-ghost"
              drop-class="card-ghost-drop"
              :animation-duration="100"
              :get-child-payload="getItemPayload(list.id)"
              @drop="e => onCardDrop(list.id, e)"
            >
              <Draggable v-for="item in list.items" :key="item.id">
                <Card :item="item"/>
              </Draggable>

            </Container>

            <div class="item-entry">
              <ui-item-entry :list-id="list.id"
                             placeholder="Add an item"
                             @enter="onAddItem"/>
            </div>

          </section>

        </Draggable>

        <Draggable>
          <section class="new-list">
            <input placeholder="Add a list" class="input" @keydown.enter="onAddList"/>
          </section>
        </Draggable>

      </Container>

    </div>

    <ui-modal ref="modal"
              :active="modal"
              :cancellable="1"
              @close="onModalClose"
    >
      <UiItemForm ref="form"
                  @submit="onAddFullItem"
                  @cancel="onModalClose"/>
    </ui-modal>

  </div>

</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'

import Card from './Card'
import UiItemForm from '../ui/UiItemForm'
import UiItemEntry from '../ui/UiItemEntry'

export default {
  components: {
    Container,
    Draggable,
    UiItemEntry,
    UiItemForm,
    Card,
  },

  data: function () {
    return {
      modal: false,
      activeListId: null,
    }
  },

  computed: {
    lists () {
      return this.$store.state.board.lists
    }
  },

  mounted () {
    this.$store.dispatch('load', true)
  },

  methods: {
    onListDrop: function (event) {
      this.$store.commit('moveList', event)
    },

    onCardDrop: function (listId, event) {
      if (event.removedIndex !== null || event.addedIndex !== null) {
        this.$store.commit('moveItem', { listId, ...event })
      }
    },

    onAddList (event) {
      const title = event.target.value
      event.target.value = ''
      this.$store.commit('addList', {title})
      this.$nextTick(() => {
        const lists = this.$refs.list
        lists[lists.length - 1]
          .querySelector('input')
          .focus()
      })
    },

    onAddItem ({id, text, more}) {
      if (more) {
        this.activeListId = id
        this.modal = true
        this.$nextTick(() => {
          this.$refs.form.show({
            title: text
          })
        })
        return
      }
      this.addItem(id, text)
    },

    onAddFullItem (data) {
      this.addItem(this.activeListId, data.title, data.description, data.date)
      this.onModalClose()
    },

    onModalClose () {
      this.focusInput(this.activeListId)
      this.modal = false
    },

    addItem (listId, title, description, date) {
      this.$store.commit('addItem', { listId, title, description, date })
    },

    getItemPayload: function (listId) {
      return index => {
        const list = this.$store.getters['getListById'](listId)
        return list.items[index]
      }
    },

    focusInput (listId) {
      const index = this.lists.findIndex(list => list.id === listId)
      this.$refs.list[index].querySelector('input').focus()
    },
  }
}
</script>

<style lang="scss">
  .board {
    margin-top: 20px;
    white-space: nowrap;
    > * {
      display: inline-block;
    }

    .new-list {
      margin-top: 10px;
    }
  }

  .list-container {
    width: 320px;
    padding: 10px;
    margin: 5px;
    margin-right: 20px;
    background-color: #f3f3f3;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
  }

  .card {
    margin: 5px;
    background-color: white;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
    padding: 10px;
  }

  .card-ghost {
    transition: 0.25s all;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
    transform: scale(1.1);
  }

  .card-ghost-drop {
    transform: scale(1);
  }

  .list-header {
    font-size: 18px;
  }

  .list-drag-handle {
    cursor: move;
    padding: 5px;
  }

  .item-entry {
    padding-top: 10px;
    margin-top: 10px;
    border-top: 1px solid #DDD;
  }

</style>
