// import React from 'react'
import {connect} from 'react-redux'

import { TO_GET_LOGIN } from '../../constant/actionType'
import { getQueryString,  getStorage, } from '../../util'

const dispatchMapProps = dispatch => ({
    getUserLogin: (payload) => dispatch({type: TO_GET_LOGIN, payload}),
})

const isMoblieMode = false

function AuthLogin(props){      
    const code = getQueryString("code")
    const user = getStorage('user')
    if(code){
        props.getUserLogin({isMoblieMode,code})
    }else if(user === ''|| !user.openid){
        if(isMoblieMode){
            let appid = 'wxf707fc6da6cf1a2f',//瑞金网络'wxf707fc6da6cf1a2f',福佑法缘'wx9ce81988a89adfc4'，金品购'wxf1f524212dffeab5'
                RedicetURI = window.location.href,
                uri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${RedicetURI}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
            window.location.href = uri;
        }else{
            props.getUserLogin({isMoblieMode})
        }
    }
    return props.children
}

export default connect( null, dispatchMapProps )(AuthLogin)