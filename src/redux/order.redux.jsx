// import axios from "axios";

const UPDATEORDER = 'UPDATEORDER'

const initState = {
    template:'',
    num:2,
    time:'',
    position:[],
    total:'',
    redirectTo:''
}
export function order(state=initState, action){
    switch(action.type){
        case UPDATEORDER:
            return {...state, ...action.payload}
        default:
            return state
    }
}
export function newOrder(){
    return {type:UPDATEORDER, payload:initState}
}
export function updateOrder(data){
    return {type:UPDATEORDER, payload:data}
}