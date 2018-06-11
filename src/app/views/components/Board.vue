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

import { updateArray } from 'app/utils/board'

let id = 0

function card (title, description, date) {
  id++
  if (date) {
    date = Number(new Date(date))
  }
  return {id, title, description, date}
}

function list (title, items = []) {
  id++
  return {id, title, items}
}

const dummy = [
  list('One', [
    card('1 1'),
    card('1 2'),
    card('1 3'),
  ]),
  list('Two', [
    card('2 1'),
    card('2 2'),
    card('2 3'),
  ]),
  list('Three', [
    card('3 1'),
    card('3 2'),
    card('3 3'),
  ]),
]

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
      lists: dummy
    }
  },

  methods: {
    onListDrop: function (event) {
      this.lists = updateArray(this.lists, event)
    },

    onCardDrop: function (listId, event) {
      if (event.removedIndex !== null || event.addedIndex !== null) {
        // find containing list of item
        const list = this.getListById(listId)

        // copy list and move item
        const newList = Object.assign({}, list)
        newList.items = updateArray(newList.items, event)

        // replace old list with copy
        const listIndex = this.lists.indexOf(list)
        this.lists.splice(listIndex, 1, newList)
      }
    },

    onAddList (event) {
      const text = event.target.value
      event.target.value = ''
      this.addList(text)
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
      this.addCard(id, text)
    },

    onAddFullItem (data) {
      this.addCard(this.activeListId, data.title, data.description, data.date)
      this.onModalClose()
    },

    onModalClose () {
      this.focusInput(this.activeListId)
      this.modal = false
    },

    getItemPayload: function (listId) {
      return index => {
        return this.getListById(listId).items[index]
      }
    },

    getListById (listId) {
      return this.lists.find(list => list.id === listId)
    },

    addList (text) {
      this.lists.push(list(text))
      this.$nextTick(() => {
        const lists = this.$refs.list
        lists[lists.length - 1]
          .querySelector('input')
          .focus()
      })
    },

    addCard (listId, text, description, date) {
      this.getListById(listId).items.push(card(text, description, date))
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
