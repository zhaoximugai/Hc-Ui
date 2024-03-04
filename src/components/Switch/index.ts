import type { App } from "vue";
import HcSwitch from "./Switch.vue";

HcSwitch.install=(app:App)=>{
    app.component(HcSwitch.name,HcSwitch)
}

export default HcSwitch

export * from './types'