import {defineComponent} from 'vue'

const RenderVnode=defineComponent({
    props:{
        vNode:{
            type:[String,Object],
            require:true
        }
    },
    setup(props){
        return ()=>props.vNode
    }
})

export default RenderVnode