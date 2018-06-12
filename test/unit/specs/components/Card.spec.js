import { text } from '../../helpers'

import Vue from 'vue'
import { makeItem } from '@/app/utils/data'
import Card from '@/app/views/elements/Card'

describe('Card.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Card)
    const vm = new Constructor({
      propsData: {
        item: makeItem('Go to the shop', 'Buy milk')
      }
    }).$mount()
    expect(text(vm, '.item-title'))
      .toEqual('Go to the shop')
    expect(text(vm, '.item-description'))
      .toEqual('Buy milk')
  })
})
