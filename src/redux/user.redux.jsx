
import { LOAD_DATA } from '../constant/actionType'

const initState = {
    id:'',
    openid:'',
    nick:'',
    headImgURL:''
}
export function user(state=initState, action){
    switch(action.type){
        case LOAD_DATA:
            return {...state ,...action.payload}
        default:
            return state
    }
}