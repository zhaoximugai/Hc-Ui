import type { App } from "vue"
import Button from '../src/components/Button/Button.vue'
const plugins={
    install:(app:App)=>{
        app.config.globalProperties.$echo=(name:string)=>{
            return `hello${name}`
        },
        app.component('hc-button',Button)
        app.provide('test',{message:'from plugin'})
    }
}
export default plugins