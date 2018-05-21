// import axios from "axios";

const TEMPLATE = 'TEMPLATE'

const initState = {
    template:'',
    num:'',
    time:'',
    position:'',
    total:''
}
export function order(state=initState, action){
    switch(action.type){
        case TEMPLATE:
            return {...state, template:action.payload}
        default:
            return state
    }
}

export function getTemplate(data){
    return {type:TEMPLATE, payload:data}
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