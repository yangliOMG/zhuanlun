import { SAVEPRAYLIST , DELPRAYLIST} from '../constant/actionType'

const initState = {
    prayList:[],
}
export function prayList(state=initState, action){
    switch(action.type){
        case SAVEPRAYLIST:
            return {...state ,prayList : action.payload}
        case DELPRAYLIST:
            const prayList = state.prayList.filter(v=>v.id!==action.payload)
            return {...state ,prayList}
        default:
            return state
    }
}
