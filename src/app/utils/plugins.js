export function makeDropHandler (onComplete, onDrop) {
  let src = null
  let trg = null

  function reset () {
    src = null
    trg = null
  }

  return function (list, event) {
    if (onDrop) {
      onDrop(list, event)
    }
    if (event.removedIndex !== null) {
      src = { list, index: event.removedIndex }
    }
    if (event.addedIndex !== null) {
      trg = { list, index: event.addedIndex }
    }
    if (src && trg) {
      this[onComplete](src.list, src.index, trg.list, trg.index)
      reset()
    }
  }
}
