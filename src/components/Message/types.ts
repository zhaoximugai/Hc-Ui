import type { VNode,ComponentInternalInstance } from "vue";

export interface MessageProps{
    message?:string|VNode,
    duration?:number,
    showClose?:boolean,
    type?: 'success'| 'info'| 'warning'| 'danger';
    onDestory:()=>void,
    offset?:number,
    zIndex:number
    id:string,
    transitionName?:string
}

export interface MessageContext {
    id:string,
    vnode:VNode,
    vm:ComponentInternalInstance,
    props:MessageProps,
    destory:()=>void
}

export type CreateMessageProps=Omit<MessageProps,'onDestory' | 'id' |'zIndex'>