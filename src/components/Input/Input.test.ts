import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './Input.vue'

describe('Input', () => {
  it('基本展示', () => {
    // 针对动态 class，查看 classes 是否正确
    // 针对 v-if 是否渲染正确的标签以及内容
    // 针对 slots，是否渲染对应的 slots 内容
    const wrapper = mount(Input, {
      props: {
        modelValue: '666',
        size: 'small',
        type: 'text'
      },
      slots: {
        prepend: 'prepend',
        prefix: 'prefix'
      }
    })
    console.log(wrapper.html());
    //classes
    expect(wrapper.classes()).toContain('small')
    expect(wrapper.classes()).toContain('prepend')

    //是否渲染正确的标签
    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.get('input').attributes('type')).toBe('text')

    // slots
    expect(wrapper.find('.hc-input__prepend').exists()).toBeTruthy()
    expect(wrapper.get('.hc-input__prepend').text()).toBe('prepend')

    expect(wrapper.find('.hc-input__prefix').exists()).toBeTruthy()
    expect(wrapper.get('.hc-input__prefix').text()).toBe('prefix')

    //textarea
    const wrapper2 = mount(Input, {
      props: {
        type: 'textarea',
        modelValue: '666'
      }

    })

    expect(wrapper2.find('textarea').exists()).toBeTruthy()
  })

  it('支持v-model', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e })
      }
    })

    //初始值
    const input = wrapper.get('input')
    expect(input.element.value).toBe('test')
    //更新值
    //这里会触发input和change事件
    await input.setValue('update')
    expect(wrapper.props('modelValue')).toBe('update')
    expect(input.element.value).toBe('update')
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')

    const inputEvent=wrapper.emitted('input')
    const changeEvent=wrapper.emitted('change')
    expect(inputEvent![0]).toEqual(['update'])
    expect(changeEvent![0]).toEqual(['update'])
    //v-modle的异步更新
    await wrapper.setProps({ modelValue: 'prop update' })
    expect(input.element.value).toBe('prop update')
  })

  it('支持点击清空字符串', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        clearable: true,
        type: 'text'
      },
      global: {
        stubs: ['Icon']
      }
    })
    //不出现对应的Icon区域
    expect(wrapper.find('.hc-input__clear').exists()).toBeFalsy()
    const input=wrapper.get('input')

    await input.trigger('focus')

    //出现Icon区域
    expect(wrapper.find('.hc-input__clear').exists()).toBeTruthy()

    //点击值变空
    await wrapper.get('.hc-input__clear').trigger('click')
    expect(input.element.value).toBe('')

    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted()).toHaveProperty('clear')
    const inputEvent=wrapper.emitted('input')
    const changeEvent=wrapper.emitted('change')
    expect(inputEvent![0]).toEqual([''])
    expect(changeEvent![0]).toEqual([''])

    await input.trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur')

  })

  it('支持密码切换显示',async()=>{
    const wrapper=mount(Input,{
      props:{
        modelValue:'',
        showPassword:true,
        type:'text'
      },
      global:{
        stubs:['Icon']
      }
    })

    //不出现Icon区域，值为空
    expect(wrapper.find('.hc-input__password').exists()).toBeFalsy()
    const input=wrapper.get('input')
    expect(input.element.type).toBe('password')
    //出现Icon区域
    await input.setValue('123')
    const eyeIcon=wrapper.find('.hc-input__password')
    expect(eyeIcon.exists()).toBeTruthy()
    expect(eyeIcon.attributes('icon')).toBe('eye-slash')
    //点击切换input类型
    await eyeIcon.trigger('click')
    expect(input.element.type).toBe('text')
    expect(wrapper.find('.hc-input__password').attributes('icon')).toBe('eye')
  })

})