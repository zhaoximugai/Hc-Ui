import type { App } from "vue";
import Message from "@/components/Message/Message.vue";
import { createMessage as HCmessage ,closeAll } from "@/components/Message/method";

Message.install=(app:App)=>{
    app.component(Message.name,Message)
}

export default Message
export {
    HCmessage,closeAll
}
export * from './types'