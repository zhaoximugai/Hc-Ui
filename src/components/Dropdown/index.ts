import type { App } from "vue";
import HcDropdown from './Dropdown.vue'


HcDropdown.install=(app:App)=>{
    app.component(HcDropdown.name,HcDropdown)
}

export default HcDropdown

export * from './types'