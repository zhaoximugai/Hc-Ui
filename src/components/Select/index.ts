import type { App } from "vue";
import HcSelect from "./Select.vue";

HcSelect.install=(app:App)=>{
    app.component(HcSelect.name,HcSelect)
}

export default HcSelect

export * from './types'