import type { App } from "vue";
import HcButton from "./Button.vue";

HcButton.install=(app:App)=>{
    app.component(HcButton.name,HcButton)
}

export default HcButton

export * from './types'