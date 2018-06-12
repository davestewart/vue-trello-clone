const uuidv1 = require('uuid/v1')

export function card (title, description, date, id = null) {
  id = id || uuidv1()
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
