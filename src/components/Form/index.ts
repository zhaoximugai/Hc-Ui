import type { App } from "vue";
import HcForm from "./Form.vue";
import HcFormItem from "./FormItem.vue";

HcForm.install=(app:App)=>{
    app.component(HcForm.name,HcForm)
}
HcFormItem.install=(app:App)=>{
    app.component(HcFormItem.name,HcFormItem)
}
export default HcForm
export {
    HcFormItem
}

export * from './types'