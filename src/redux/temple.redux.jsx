
import { SAVEANCHOR, SAVELIST } from '../constant/actionType'

const initState = {
    templeList:[],
    index:1,
    anchor:""
}
export function praydata(state=initState, action){
    switch(action.type){
        case SAVELIST:
            return {...state ,templeList : action.payload ,index : action.index }
        case SAVEANCHOR:
            return {...state ,anchor : action.payload}
        default:
            return state
    }
}
