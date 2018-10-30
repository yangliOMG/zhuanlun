const UPDATEORDER = 'UPDATEORDER'

const initState = {
    blessing:'',
    num:1,
    duration:1,
    position:[],
    total:'',
    id:'',
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