import { getQueryString,  getStorage, compatUrl, arrangeUrl } from '../../util'
import {ajaxLogin} from '../../service/asyncFun'

const isMoblieMode = false

function AuthLogin(props){      
    const code = getQueryString("code")
    const user = getStorage('user')
    if(code){
        ajaxLogin({isMoblieMode,code},()=>{
            window.location.href = arrangeUrl(window.location)  //多刷新一次
        })
    }else if(user === ''|| !user.openid){
        if(isMoblieMode){
            let appid = 'wxf707fc6da6cf1a2f',//瑞金网络'wxf707fc6da6cf1a2f',福佑法缘'wx9ce81988a89adfc4'，金品购'wxf1f524212dffeab5'
                RedicetURI = compatUrl(window.location.href),
                uri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${RedicetURI}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
            window.location.href = uri;
        }else{
            ajaxLogin({isMoblieMode})
        }
    }
    return props.children
}

export default AuthLogin
