import {computed, ref} from 'vue'

const zIndex=ref(0)
const useZindex=(initialValue=2000)=>{
    const initialZIndex=ref(initialValue)
    const currentZIndex=computed(()=>zIndex.value+initialZIndex.value)
    const nextZIndex=()=>{
        zIndex.value++
        return currentZIndex.value
    }
    return {
        currentZIndex,
        nextZIndex,
        initialZIndex
    }
}

export default useZindex