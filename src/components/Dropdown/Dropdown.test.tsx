import { describe, expect, test, vi,beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Dropdown from './Dropdown.vue'
import type { MenuOption } from './types'
import { h } from 'vue'
const options: MenuOption[] = [
    { key: 1, label: h('b', 'this is blod') },
    { key: 2, label: 'item2', disabled: true },
    { key: 3, label: 'item3', divided: true },
    { key: 4, label: 'item4' }
]
const visibleChange = vi.fn()
beforeEach(()=>{
    vi.useFakeTimers()
})
describe('Dropdown.vue', () => {
    
    test('basic dropdown', async () => {
        const wrapper = mount(() =>
            <Dropdown menuOptions={options} trigger='click' onVisibleChange={visibleChange}>
                <div id='imgage'>123456</div>
            </Dropdown>, { attachTo: document.body })

        //静态测试
        const triggerAera = wrapper.find('#imgage')
        console.log(triggerAera);
        
        expect(triggerAera.exists()).toBeTruthy()
        expect(wrapper.find('.hc-dropdown').exists()).toBeTruthy()

        //测试点击行为
        await triggerAera.trigger('click')
        await vi.runAllTimers()

        expect(visibleChange).toHaveBeenCalledWith(true)
        expect(wrapper.find('.hc-dropdown__menu').exists()).toBeTruthy()
        

    })

})