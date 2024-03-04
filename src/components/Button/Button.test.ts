import {describe,test,expect} from 'vitest'
import {mount} from '@vue/test-utils'
import Button from './Button.vue'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import Icon from '../Icon/Icon.vue'

describe('Button.vue',()=>{
    test('basic button',()=>{
        const wrapper=mount(Button,{
            props:{
                type:'primary'
            },
            slots:{
                default:'button'
            }
        })
        expect(wrapper.classes()).toContain('hc-button--primary')

        //get,find
        expect(wrapper.get('button').text()).toBe('button')

        //events
        wrapper.get('button').trigger('click')
        console.log(wrapper.emitted());
        expect(wrapper.emitted()).toHaveProperty('click')
         
    })

    test('disabled',()=>{
        const wrapper=mount(Button,{
            props:{
                disabled:true
            },
            slots:{
                default:'disabled'
            }
        })
        expect(wrapper.attributes('disabled')).toBeDefined()

        expect(wrapper.find('button').element.disabled).toBeDefined()

        wrapper.get('button').trigger('click')
        // expect(wrapper.emitted()).toHaveProperty('click')
    })

    test('icon',()=>{
        const wrapper=mount(Button,{
            props:{
                icon:'arrow-up'
            },
            slots:{
                default:'icon'
            },
            global:{
                stubs:['FontAwesomeIcon']
            }
        })
        console.log(wrapper.html());
        const inocElement=wrapper.findComponent(FontAwesomeIcon)
        expect(inocElement.exists()).toBeTruthy()
        expect(inocElement.attributes('icon')).toBe('arrow-up')
        
    })

    test('loading',()=>{
        const wrapper=mount(Button,{
            props:{
                loading:true
            },
            slots:{
                default:'loading'
            },
            global:{
                stubs:['Icon']
            }
        })
        console.log(wrapper.html());
        const inocElement=wrapper.findComponent(Icon)
        expect(inocElement.exists()).toBeTruthy()
        expect(inocElement.attributes('icon')).toBe('spinner')
        expect(wrapper.attributes('disabled')).toBeDefined()
        
      
        
    })
})