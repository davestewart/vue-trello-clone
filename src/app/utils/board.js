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
