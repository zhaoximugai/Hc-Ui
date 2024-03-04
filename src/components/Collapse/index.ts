import type { App } from "vue";
import HcCollapse from "@/components/Collapse/Collapse.vue";
import HcCollapseItem from "@/components/Collapse/CollapseItem.vue";

HcCollapse.install=(app:App)=>{
    app.component(HcCollapse.name,HcCollapse)
}
HcCollapseItem.install=(app:App)=>{
    app.component(HcCollapseItem.name,HcCollapseItem)
}
export default HcCollapse
export {
    HcCollapseItem
}

export * from './types'