import React from 'react'
import {withRouter} from 'react-router-dom'      
import axios from 'axios'
import {connect} from 'react-redux'

// import {loadData} from '../../redux/user.redux'

@withRouter 
@connect(
    null,
    // {loadData}
)
class AuthRoute extends React.Component{
    componentDidMount(){
        var appid = 'wxdd7621ca87eaf933',
            appsecret = 'e90dfba2353f9d1ee56fa5c2a0a35cda',
            RedicetURI = window.location.href,
            URL = `https://open.weixin.qq.com/connect/oauth2/authorize?
                    appid=APPID&redirect_uri=RedicetURI&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
        
        axios.get(URL,{
            headers:{
                'Access-Control-Allow-Origin':'*'
            }
        }).then(res=>{
            console.log(res)
        })
    }
    render(){
        return (
            <div>
            </div>
        )
    }
}

export default AuthRoute;