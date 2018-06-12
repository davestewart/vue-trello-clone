const uuidv1 = require('uuid/v1')

export function makeItem (title, description, date, id = null) {
  id = id || uuidv1()
  return { id, title, description, date }
}

export function makeList (title, items = []) {
  const id = uuidv1()
  return { id, title, items }
}

export function makeData () {
  return [
    makeList('One', [
      makeItem('1 1'),
      makeItem('1 2'),
      makeItem('1 3'),
    ]),
    makeList('Two', [
      makeItem('2 1'),
      makeItem('2 2'),
      makeItem('2 3'),
    ]),
    makeList('Three', [
      makeItem('3 1'),
      makeItem('3 2'),
      makeItem('3 3'),
    ]),
  ]
}
