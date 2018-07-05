import React from 'react'
import {withRouter} from 'react-router-dom'      
import {connect} from 'react-redux'

import {loadData} from '../../redux/user.redux'
import { getQueryString,  getStorage } from '../../util'
import User from '../../service/user-service.jsx'

const _user = new User()
const isMoblieMode = false

@withRouter 
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component{
    componentWillMount(){
        const code = getQueryString("code")
        const user = getStorage('user')
        if(code){
            _user.getSessionlogin(isMoblieMode,code).then(res=>{
                this.props.loadData(res)
            })
        }else if(user === ''|| !user.openid){
            if(isMoblieMode){
                let appid = 'wxf707fc6da6cf1a2f',
                    RedicetURI = window.location.href,
                    uri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${RedicetURI}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
                    window.location.href = uri;
            }else{
                _user.getSessionlogin(isMoblieMode).then(res=>{
                    this.props.loadData(res)
                })
                // let xhr = new XMLHttpRequest();
                // xhr.onreadystatechange = ()=> {
                //     if (xhr.readyState === 4 && xhr.status === 200) {
                //         let data = JSON.parse(xhr.responseText)
                //         const userinfo = {id:data.id, openid:data.openid, nick:data.nick, headImgURL:data.headImgURL}
                //         setStorage('user', userinfo )
                //         this.props.loadData(userinfo)
                //     }
                // }
                // xhr.open("GET", `/login/login.do?isMoblieMode=${isMoblieMode}`, false)
                // xhr.send()
            }
        }else{
            this.props.loadData(user)       //为了在个人中心页中，从微信取了用户信息能够及时显示，所以只能用redux
        }
    }
    render(){
        return (
            <div>
            </div>
        )
    }
}

export default AuthRoute;