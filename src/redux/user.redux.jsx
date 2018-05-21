import axios from "axios";
import {getRedirectPath} from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGOUT = 'LOGOUT'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
    redirectTo:'',
    msg:'',
    user:'',
    type:''
}
export function user(state=initState, action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
        case ERROR_MSG:
            return {...state,msg:action.msg,isAuth:false}
        case LOAD_DATA:
            return {...state,msg:'',...action.payload}
        case LOGOUT:
            return {...initState,redirectTo:'/login'}
        default:
            return state
    }
}

function authSuccess(obj){
    const {pwd,...data} = obj
    return {payload:data, type:AUTH_SUCCESS}
}
function errorMsg(msg){
    return {msg, type:ERROR_MSG}
}
export function logoutSubmit(){
    return { type:LOGOUT}
}

export function loadData(userinfo){
    return {type:LOAD_DATA , payload:userinfo}
}
export function update(data){
    return dispatch=>{
        axios.post('/user/update',data)
        .then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg('用户名密码必须输入')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
        .then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function regisger({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errorMsg('用户名密码必须输入')
    }
    if(pwd!==repeatpwd){
        return errorMsg('密码不同')
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
        .then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess({user,pwd,type}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}