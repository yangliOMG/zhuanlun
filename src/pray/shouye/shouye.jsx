import React from 'react'
import {connect} from 'react-redux'
import { getQueryString,  getStorage } from '../../util'
import User from '../../service/user-service.jsx'
import {loadData} from '../../redux/user.redux'
import "./shouye.less"


const _user = new User()
const isMoblieMode = false

@connect(
    state=>state.user,
    {loadData}
)
class Shouye extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    componentWillMount(){
        const code = getQueryString("code")
        const type = getQueryString("type")||'temple'
        const id = getQueryString("id")||''
        const user = getStorage('user')
        if(code){
            _user.getSessionlogin(isMoblieMode,code).then(res=>{
                this.props.loadData(res)
                this.props.history.push(`/${type}#${id}`)
            })
        }else if(user === ''|| !user.openid){
            if(isMoblieMode){
                let appid = 'wxf707fc6da6cf1a2f',
                    RedicetURI = window.location.origin+'/shouye',
                    uri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${RedicetURI}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
                    window.location.href = uri;
            }else{
                _user.getSessionlogin(isMoblieMode).then(res=>{
                    this.props.loadData(res)
                    this.props.history.push(`/${type}#${id}`)
                })
            }
        }else{
            this.props.loadData(user)       //为了在个人中心页中，从微信取了用户信息能够及时显示，所以只能用redux
            this.props.history.push(`/${type}#${id}`)
        }
    }
    render(){
        return (
            <div>
                <div className='center'>
                    加载用户信息。。
                </div>
            </div>
        )
    }
}

export default Shouye;