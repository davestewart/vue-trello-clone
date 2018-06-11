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

    <ui-modal :active="modal" @close="modal = false" ref="modal">
      <div class="query-form card">
        <div class="card-content">
          <h2 class="title">New task</h2>
          <ui-input ref="title"
                    label="Title"
                    v-model="form.title"
                    @enter="onAddFullItem"
          />
          <ui-input ref="description"
                    label="Description"
                    v-model="form.description"
                    type="textarea"
          />
          <ui-input ref="date"
                    label="Date"
                    v-model="form.date"
                    type="date"
                    @enter="onAddFullItem"
          />
          <div class="field is-grouped">
            <ui-button @click="onAddFullItem">Add</ui-button>
            <ui-button type="text" @click="onCancelFullItem">Cancel</ui-button>
          </div>
        </div>
      </div>
    </ui-modal>

  </div>

</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag } from 'app/utils/board'

import Card from './Card'
import UiItemForm from '../ui/UiItemForm'
import UiItemEntry from '../ui/UiItemEntry'

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

function form () {
  return {
    listId: null,
    title: '',
    description: '',
    date: null
  }
}

export default {
  components: {
    Container,
    Draggable,
    Card,
    UiItemEntry,
    UiItemForm,
  },

  data: function () {
    return {
      modal: false,
      form: form(),
      lists: dummy
    }
  },

  methods: {
    onListDrop: function (event) {
      this.lists = applyDrag(this.lists, event)
    },

    onCardDrop: function (listId, event) {
      if (event.removedIndex !== null || event.addedIndex !== null) {
        // find containing list of item
        const list = this.getListById(listId)

        // copy list and move item
        const newList = Object.assign({}, list)
        newList.items = applyDrag(newList.items, event)

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
        this.modal = true
        this.form.title = text
        this.form.listId = id
        this.$nextTick(() => {
          // focus first modal field
          this.$refs.modal.$el.querySelector('input').focus()
        })
        return
      }
      this.addCard(id, text)
    },

    onAddFullItem () {
      const data = this.form
      this.addCard(data.listId, data.title, data.description, data.date)
      this.onCancelFullItem()
    },

    onCancelFullItem () {
      this.focusInput(this.form.listId)
      this.form = form()
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
