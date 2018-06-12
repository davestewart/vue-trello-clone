/**
 * Helper function to manage @drop events for VueSmoothDnD
 *
 * Returns a handler function that manages drop events and calls a final drop handler
 * once removed and completed events have been received
 *
 * @usage onDrop: makeDropHandler('onDropComplete', 'onDrop
 *
 * @param   {string}      onComplete    The onComplete handler name
 * @param   {string}     [onDrop]       Optional onDrop handler name
 * @returns {Function}                  Handler function that manages all @drop evens
 */
export function makeDropHandler (onComplete, onDrop) {
  let src = null
  let trg = null
  let payload = null
  let element = null

  function reset () {
    src = null
    trg = null
    payload = null
    element = null
  }

  /**
   * DropHandler function
   *
   * Handles the DnD @drop event:
   *
   * When both remove and added event have been received, the
   * pass onComplete handler is called, passing the following properties:
   *
   *  - @param  {DragData}      src         Information about the drag source
   *  - @param  {DragData}      trg         Information about the drop target
   *  - @param  {HTMLElement}   element     A reference to the dragged HTML element
   *  - @param  {*}            [payload]    Any payload that was passed using "get-child-payload"
   *
   * The function itself takes the following parameters
   *
   * @param     {object}        event       The drag event created by the plugin
   * @param     {*[]}           params      Any additional parameters that were passed to the handler
   */
  return function onDrop (event, ...params) {
    // delegate to drop handler if supplied
    if (this.onDrop) {
      this[onDrop](event, ...params)
    }

    // source and target events
    if (event.removedIndex !== null) {
      src = new DragData(event.removedIndex, params)
    }
    if (event.addedIndex !== null) {
      trg = new DragData(event.addedIndex, params)
      payload = event.payload
      element = event.droppedElement
    }

    // source and target events have fired
    if (src && trg) {
      this[onComplete](src, trg, element, payload)
      reset()
    }
  }
}

/**
 * A class which represents data about a drag
 *
 * @param {array}   index     The array index of the dragged item
 * @param {array}   params    Additional params that were passed
 * @constructor
 */
function DragData (index, params) {
  this.index = index
  this.params = params
}
