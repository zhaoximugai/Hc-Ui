import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Tooltip from './Tooltip.vue'
vi.mock('@popperjs/core')
const onVisibleChange = vi.fn()
describe('Tooltip.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  test('basic tooltip', async () => {
    const wrapper = mount(() =>
      <div>
        <div id='outside'>
</div>
        <Tooltip content='hello tooptip' trigger='click' onVisibleChange={onVisibleChange} >
          <button id='trigger'>Trigger</button>
        </Tooltip>
      </div>
      ,
      {
        attachTo: document.body
      })

    //静态测试
    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy()
    expect(wrapper.find('.hc-tooltip__popper').exists()).toBeFalsy()


    //测试点击行为
    await triggerArea.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.hc-tooltip__popper').exists()).toBeTruthy()
    expect(wrapper.get('.hc-tooltip__popper').text()).toBe('hello tooptip')
    expect(onVisibleChange).toHaveBeenCalledWith(true)

    // await triggerArea.trigger('click')
    // await vi.runAllTimers()
    // expect(wrapper.find('.hc-tooltip__popper').exists()).toBeFalsy()
    // expect(onVisibleChange).toHaveBeenLastCalledWith(false)

    //测试点击外侧
    wrapper.get('#outside').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.hc-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  })
})