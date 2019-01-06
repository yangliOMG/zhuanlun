import { UPDATEORDER, INITORDER, UPDATEPOSITION } from '../constant/actionType'

const initState = {
    blessing:'',
    num:1,
    duration:1,
    position:[],
    id:'',
}
export function order(state=initState, action){
    switch(action.type){
        case UPDATEORDER:
            return {...state, ...action.payload}
        case INITORDER:
            return {...state, ...initState}
        case UPDATEPOSITION:
            let position = state.position.filter(v=>!action.payload.includes(v[0]))
            return {...state, position}
        default:
            return state
    }
}