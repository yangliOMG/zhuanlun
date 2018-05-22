// import axios from "axios";

const TEMPLATE = 'TEMPLATE'
const POSITION = 'POSITION'
const NUM = 'NUM'
const TIME = 'TIME'

const ERROR_MSG = 'ERROR_MSG'
const PAY_SUCCESS = 'PAY_SUCCESS'

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
        case TEMPLATE:
            return {...state, template:action.payload}
        case POSITION:
            return {...state, position:action.payload, num:action.payload.length}
        case NUM:
            return {...state, num:action.payload.num, position:action.payload.position}
        case TIME:
            return {...state, time:action.payload}

        case PAY_SUCCESS:
            return {...state, ...action.payload}
        case ERROR_MSG:
            return {...state, msg:action.msg}
        default:
            return state
    }
}

// function errorMsg(msg){
//     return {type:ERROR_MSG, msg}
// }

export function getTemplate(data){
    return {type:TEMPLATE, payload:data}
}
export function getPosition(data){
    return {type:POSITION, payload:data}
}
export function getNum(num,position){
    return {type:NUM, payload:{num,position}}
}
export function getTimelong(data){
    return {type:TIME, payload:data}
}

export function buildOrder({num,time,template,position,total}){
    return {type:PAY_SUCCESS, payload:{num,time,template,position,total}}
}


export function getUserList(data){
    return dispatch=>{
        // axios.get('/user/list.do?type='+type)
        // .then(res=>{
        //     if(res.status===200&&res.data.code===0){
                dispatch(getTemplate(data))
        //     }
        // })
    }
}