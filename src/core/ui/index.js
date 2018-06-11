import Vue from 'vue'

import UiButton from './UiButton'
import UiModal from './UiModal'
import UiInput from './UiInput'

const components = {
  UiButton,
  UiModal,
  UiInput
}

Object
  .keys(components)
  .forEach(name => Vue.component(name, components[name]))
