import React from 'react'
import {withRouter} from 'react-router-dom'      
import {connect} from 'react-redux'

import {loadData} from '../../redux/user.redux'
import { getQueryString, setStorage, getStorage } from '../../util'
import User from '../../service/user-service.jsx'

const _user = new User()
const isMoblieMode = false

@withRouter 
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component{
    componentDidMount(){
        const code = getQueryString("code")
        const user = getStorage('user')
        if(code){
            _user.getUserInfo(code).then(res=>{
                if(res.status === 200){
                    const userinfo = {openid:res.data.openid, nick:res.data.nick, headImgURL:res.data.headImgURL}
                    setStorage('user', userinfo )
                    this.props.loadData(userinfo)
                }
            })
        }else if(user === ''|| !user.openid){
            if(isMoblieMode){
                var appid = 'wxf707fc6da6cf1a2f',
                    RedicetURI = window.location.href,
                    uri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${RedicetURI}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
                    window.location.href = uri;
            }else{
                _user.getUserInfo().then(res=>{
                    if(res.status === 200){
                        const userinfo = {openid:res.data.openid, nick:res.data.nick, headImgURL:res.data.headImgURL}
                        setStorage('user', userinfo )
                        this.props.loadData(userinfo)
                    }
                })
            }
        }else{
            this.props.loadData(user)
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