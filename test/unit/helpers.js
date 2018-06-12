export function text (vm, selector) {
  return vm.$el.querySelector(selector).textContent
}

export function copy (value) {
  return JSON.parse(JSON.stringify(value))
}
