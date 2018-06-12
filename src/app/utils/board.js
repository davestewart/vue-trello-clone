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

export function getItemById (lists, itemId) {
  const list = lists.find(list => list.items.find(item => item.id === itemId))
  if (list) {
    return list.items.find(item => item.id === itemId)
  }
}
