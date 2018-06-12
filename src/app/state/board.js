import { makeItem, makeList } from 'app/utils/data'
import { getItemById, getListById, getListByItemId, updateArray } from 'app/utils/board'

export function state () {
  return {
    lists: [],
  }
}

const getters = {
  getListById: state => listId => {
    return getListById(state.lists, listId)
  },

  getListByItemId: state => itemId => {
    return getListByItemId(state.lists, itemId)
  },

  getItemById: state => itemId => {
    return getItemById(state.lists, itemId)
  }
}

export const mutations = {
  lists (state, value) {
    state.lists = value
  },

  reset (state) {
    state.lists = []
  },

  addList (state, { title }) {
    state.lists.push(makeList(title))
  },

  moveList (state, { removedIndex, addedIndex }) {
    state.lists = updateArray(state.lists, removedIndex, addedIndex)
  },

  removeList (state, { listId }) {
    const index = state.lists.findIndex(list => list.id === listId)
    state.lists.splice(index, 1)
  },

  addItem (state, { listId, title, description, date }) {
    const list = getListById(state.lists, listId)
    list.items.push(makeItem(title, description, date))
  },

  updateItem (state, { itemId, title, description, date }) {
    const item = getItemById(state.lists, itemId)
    if (item) {
      Object.assign(item, makeItem(title, description, date, itemId))
    }
  },

  moveItem (state, [fromListRef, fromIndex, toListRef, toIndex]) {
    const fromList = typeof fromListRef === 'number'
      ? state.lists[fromListRef].items
      : getListById(state.lists, fromListRef)
    const toList = typeof toListRef === 'number'
      ? state.lists[toListRef].items
      : getListById(state.lists, toListRef)
    toList.splice(toIndex, 0, fromList.splice(fromIndex, 1)[0])
  },

  removeItem (state, { itemId }) {
    const list = getListByItemId(state.lists, itemId)
    list.items.splice(list.items.findIndex(item => item.id === itemId), 1)
  }
}

export default {
  state,
  mutations,
  getters,
}
