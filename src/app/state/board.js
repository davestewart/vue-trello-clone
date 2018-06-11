import { getListById, updateArray2 as updateArray, card, list } from 'app/utils/board'

const storage = window.localStorage

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
      ? dummy
      : storage.getItem('lists')
    commit('lists', lists || [])
  },
}

const mutations = {
  lists (state, value) {
    state.lists = value
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
