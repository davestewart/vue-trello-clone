const uuidv1 = require('uuid/v1')

/**
 * Helper function to update array on drop
 *
 * @param {array}   oldArray      The array to be altered
 * @param {number}  removedIndex  The index the element moved from
 * @param {number}  addedIndex    The index the element moved to
 * @param {*}       payload       Any payload associated with the move
 * @returns {*}
 */
export function updateArray (oldArray, removedIndex, addedIndex, payload) {
  if (removedIndex === null && addedIndex === null) return oldArray

  const newArray = [...oldArray]
  let item = payload

  if (removedIndex !== null) {
    item = newArray.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    newArray.splice(addedIndex, 0, item)
  }

  return newArray
}

export function getListById (lists, listId) {
  return lists.find(list => list.id === listId)
}

export function getListByItemId (lists, itemId) {
  return lists.find(list => list.items.find(item => item.id === itemId))
}

export function card (title, description, date) {
  const id = uuidv1()
  if (date) {
    date = Number(new Date(date))
  }
  return { id, title, description, date }
}

export function list (title, items = []) {
  const id = uuidv1()
  return { id, title, items }
}

export function dummy () {
  return [
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
}
