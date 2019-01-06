import React from 'react'
import {connect} from 'react-redux'

import { getQueryString,  getStorage, } from '../../util'
import { TO_GET_LOGIN } from '../../constant/actionType'

import "./shouye.css"


const isMoblieMode = false

@connect(()=>({}),
    dispatch => ({
        getUserLogin: (payload,callback) => dispatch({type: TO_GET_LOGIN, payload,callback}),
        // loadData: (payload) => dispatch({type: LOAD_DATA, payload }),
    })
)
class Shouye extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    componentWillMount(){
        const code = getQueryString("code")
        const type = getQueryString("type")||'temple'
        const user = getStorage('user')
        if(code){
            this.props.getUserLogin({isMoblieMode,code}, () =>{
                window.location.href = `/${type.replace(':','#')}`
            })
        }else if(user === ''|| !user.openid){
            if(isMoblieMode){
                let appid = 'wx9ce81988a89adfc4',//瑞金网络'wxf707fc6da6cf1a2f',福佑法缘'wx9ce81988a89adfc4'，金品购'wxf1f524212dffeab5'
                    RedicetURI = window.location.href,
                    uri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${RedicetURI}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
                window.location.href = uri;
            }else{
                this.props.getUserLogin({isMoblieMode}, ()=>{
                    window.location.href = `/${type.replace(':','#')}`
                })
            }
        }else{ 
            window.location.href = `/${type.replace(':','#')}`
            // this.props.loadData(user)      
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