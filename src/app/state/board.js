import { getListById, getListByItemId, updateArray, card, list, dummy } from 'app/utils/board'

const storage = window.localStorage

const state = {
  lists: [],
}

const getters = {
  getListById: state => listId => {
    return getListById(state.lists, listId)
  },

  getListByItemId: state => itemId => {
    return getListByItemId(state.lists, itemId)
  },
}

const actions = {
  load ({ commit }, mock) {
    const lists = mock
      ? dummy()
      : storage.getItem('lists')
    commit('lists', lists || [])
  },
}

const mutations = {
  lists (state, value) {
    state.lists = value
  },

  reset (state) {
    state.lists = []
  },

  addList (state, { title }) {
    state.lists.push(list(title))
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
    list.items.push(card(title, description, date))
  },

  moveItem (state, { listId, removedIndex, addedIndex, payload }) {
    // find containing list of item
    const list = getListById(state.lists, listId)

    // copy list and move item
    const newList = Object.assign({}, list)
    newList.items = updateArray(newList.items, removedIndex, addedIndex, payload)

    // replace old list with copy
    const listIndex = state.lists.indexOf(list)
    state.lists.splice(listIndex, 1, newList)
  },

  removeItem (state, { itemId }) {
    const list = getListByItemId(state.lists, itemId)
    list.items.splice(list.items.findIndex(item => item.id === itemId), 1)
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
}
