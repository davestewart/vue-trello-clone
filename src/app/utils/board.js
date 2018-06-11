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
export const applyDrag = (arr, event) => {
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

export function getNextId (arr) {
  const id = arr.reduce((id, item) => {
    if (item.id > id) {
      id = item.id
    }
    return id
  }, 0)
  return id + 1
}

