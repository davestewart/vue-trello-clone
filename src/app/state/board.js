import { getListById, updateArray, card, list, dummy } from 'app/utils/board'

const storage = window.localStorage

const state = {
  lists: [],
}

const getters = {
  getListById: state => listId => {
    return getListById(state.lists, listId)
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
    // not implemented
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
    // not implemented
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
}
