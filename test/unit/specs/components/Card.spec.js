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
    expect(vm.$el.querySelector('.item-title').textContent)
      .toEqual('Go to the shop')
    expect(vm.$el.querySelector('.item-description').textContent)
      .toEqual('Buy milk')
  })
})
