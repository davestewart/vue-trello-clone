import { copy } from '../../helpers'
import { mutations, state as makeState } from '@/app/state/board'

const {
  getListById,
  getListByItemId,
  getItemById,
  lists,
  reset,
  addList,
  moveList,
  removeList,
  addItem,
  updateItem,
  moveItem,
  removeItem
} = mutations

// empty state
const state = makeState()

describe('board mutations', () => {

  test('addList should add a new list', () => {
    const list = {
      title: 'List 1'
    }
    addList(state, list)
    expect(state.lists).toEqual([
      {
        id: expect.stringMatching(/.+/),
        title: list.title,
        items: []
      }
    ])
  })

  test('addList should add a second list', () => {
    const list = {
      title: 'List 2'
    }
    addList(state, list)
    expect(state.lists.length).toEqual(2)
  })

  test('addItem should add a new item', () => {
    const list = state.lists[0]
    const item = {
      listId: list.id,
      title: 'New item',
      description: 'Hey there',
      date: '2018-01-01',
    }
    addItem(state, item)
    expect(list.items[0]).toEqual(
      {
        id: expect.stringMatching(/.+/),
        title: item.title,
        description: item.description,
        date: item.date,
      }
    )
  })

  test('moveItem should move an item to another list', () => {
    const payload = copy(state.lists[0].items[0])
    moveItem(state, [0, 0, 1, 0])
    expect(state.lists[1].items[0]).toEqual(payload)
  })
})
