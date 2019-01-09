import React from 'react'
import {connect} from 'react-redux'
import { TO_GET_LOGIN, ISMOBILEMODE as isMoblieMode } from '../../constant/actionType'
import { getQueryString, getStorage, } from '../../util'

import "./style.css"

const dispatchMapProps = dispatch => ({
    getUserLogin: (payload,callback) => dispatch({type: TO_GET_LOGIN, payload,callback}),
})

function Login(props){
    const code = getQueryString("code")
    props.getUserLogin({isMoblieMode, code},()=>{
        window.location.href = getStorage('path')||'temple'
    }) 
    return <div>
                <div className='center'>
                    加载用户信息。。
                </div>
            </div>
}

export default connect( null, dispatchMapProps )(Login)
