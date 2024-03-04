import type { App } from "vue";
import HcTooltip from './Tooltip.vue'


HcTooltip.install=(app:App)=>{
    app.component(HcTooltip.name,HcTooltip)
}

export default HcTooltip

export * from './types'