const uuidv1 = require('uuid/v1')

/**
 * Helper function to update array on drop
 *
 * @param {array}   arr                 The array to be altered
 * @param {object}  event               The drag event
 * @param {number}  event.removedIndex  The index the element moved from
 * @param {number}  event.addedIndex    The index the element moved to
 * @param {*}       event.payload       Any payload associated with the move
 * @returns {*}
 */
export function updateArray (arr, event) {
  const { removedIndex, addedIndex, payload } = event
  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  let item = payload

  if (removedIndex !== null) {
    item = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, item)
  }

  return result
}

/**
 * Helper function to update array on drop
 *
 * @param {array}   oldArray    The array to be altered
 * @param {number}  removedIndex  The index the element moved from
 * @param {number}  addedIndex    The index the element moved to
 * @param {*}       payload       Any payload associated with the move
 * @returns {*}
 */
export function updateArray2 (oldArray, removedIndex, addedIndex, payload) {
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
