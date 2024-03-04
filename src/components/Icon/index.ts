import type { App } from "vue";
import HcIcon from './Icon.vue'


HcIcon.install=(app:App)=>{
    app.component(HcIcon.name,HcIcon)
}

export default HcIcon

export {
    HcIcon
}

export * from './types'