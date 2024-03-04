import type { App } from "vue";
import HcInput from './Input.vue'


HcInput.install=(app:App)=>{
    app.component(HcInput.name,HcInput)
}

export default HcInput

export * from './types'