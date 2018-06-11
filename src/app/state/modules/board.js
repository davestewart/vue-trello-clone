import { getNextId } from 'utils/array'

const state = {
  lists: [
    {
      title: 'List 1',
      items: [
        { title: 'Item 1', description: '', date: '' },
        { title: 'Item 2', description: '', date: '' },
        { title: 'Item 3', description: '', date: '' },
      ]
    },
    {
      title: 'List 2',
      items: [
        { title: 'Item 4', description: '', date: '' },
      ]
    },
  ],
}

const getters = {
  value: state => state.value,
}

const actions = {}

const mutations = {
  addList (state, title) {
    const id = getNextId(state.items)
    state.items.push({ id, title })
  },

  removeList (state, id) {
    const index = state.items.find(item => item.id === id)
    state.items.splice(index, 1)
  },

  orderList (state, { to, from }) {

  },

  addItem (state, title) {
    const id = getNextId(state.items)
    state.items.push({ id, title })
  },

  removeItem (state, id) {
    const index = state.items.find(item => item.id === id)
    state.items.splice(index, 1)
  },

  moveItem (state, { id, from, to }) {

  },

  orderItem (state, { from, to }) {

  },

}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
