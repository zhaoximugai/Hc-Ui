import HcButton from "./components/Button/Button.vue";
import HcCollapse from "./components/Collapse/Collapse.vue";
import HcCollapseItem from "./components/Collapse/CollapseItem.vue";
import HcMessage from './components/Message/Message.vue'
import HcIcon from "./components/Icon/Icon.vue";
import HcDropdown from "./components/Dropdown/Dropdown.vue";
import HcTooltip from "./components/Tooltip/Tooltip.vue";
import HcForm from "./components/Form/Form.vue";
import HcFormItem from "./components/Form/FormItem.vue";
import HcSelect from "./components/Select/Select.vue";
import HcSwitch from "./components/Switch/Switch.vue";
import { createMessage as HCmessage , closeAll as closeMessageAll } from './components/Message/method'
import type { App } from "vue";
import '@/styles/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'


library.add(fas)

const components = [
    HcButton, HcCollapse, HcCollapseItem, HcMessage, HcIcon, HcDropdown, HcTooltip,
    HcForm, HcFormItem, HcSelect, HcSwitch
]

const install = (app: App) => {
    components.forEach(component => {
        app.component(component.name, component)
    })
}

export {
    install,
    HcButton,
    HcCollapse,
    HcCollapseItem,
    HcMessage,
    HcIcon,
    HcDropdown,
    HcTooltip,
    HcForm,
    HcFormItem,
    HcSelect,
    HcSwitch,
    HCmessage,
    closeMessageAll
}

export default {
    install
}