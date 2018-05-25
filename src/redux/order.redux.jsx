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

export function updateOrder(data){
    return {type:UPDATEORDER, payload:data}
}


export function getUserList(data){
    return dispatch=>{
        // axios.get('/user/list.do?type='+type)
        // .then(res=>{
        //     if(res.status===200&&res.data.code===0){
                // dispatch(getTemplate(data))
        //     }
        // })
    }
}