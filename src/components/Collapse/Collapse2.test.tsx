import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'
describe('Collapse.vue', () => {
  test('basic collapse', async () => {
    const onChange = vi.fn()

    const wrapper = mount(() =>
      <Collapse modelValue={['a']} onChange={onChange}>
        <CollapseItem name="a" title="title a">
          content a
        </CollapseItem>
        <CollapseItem name="b" title="title b">
          content b
        </CollapseItem>
        <CollapseItem name="c" title="title c" disabled>
          content c
        </CollapseItem>
      </Collapse>
      , {

        global: {
          stubs: ['Icon']
        },
        attachTo: document.body
      })

    const headers = wrapper.findAll('.hc-collapse-item__header')
    const contents = wrapper.findAll('.hc-collapse-item__wrapper')



    //长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    //文本
    const firstHeader = headers[0]
    const sencodHeader = headers[1]
    expect(firstHeader.text()).toBe('title a')

    //内容
    const firstcontent = contents[0]
    const secondContent = contents[1]
    expect(firstcontent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstcontent.text()).toBe('content a')
    expect(secondContent.text()).toBe('content b')

    //行为
    await firstHeader.trigger('click')
    expect(firstcontent.isVisible()).toBeFalsy()
    expect(onChange).toHaveBeenCalledWith([])

    await sencodHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()
    expect(onChange).toHaveBeenLastCalledWith(['b'])


    //disabled
    const disabledHeader = headers[2]
    const disableContent = contents[2]

    expect(disabledHeader.classes()).toContain('disabled')
    await disabledHeader.trigger('click')
    expect(disableContent.isVisible()).toBeFalsy()
  })
})