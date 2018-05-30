import React from 'react'
import { Route, Switch} from 'react-router-dom';

import Shouye from './pray/shouye/shouye.jsx';

// import AuthRoute from './component/authroute/authroute.jsx';
import Dashboard from './component/dashboard/dashboard.jsx';

class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            hasError:false
        }
    }
    componentDidCatch(err,info){
        this.setState({
            hasError:true
        })
    }

    wechatAuth(nextState, replace, next) {
        var appid = 'wxdd7621ca87eaf933',
            appsecret = 'e90dfba2353f9d1ee56fa5c2a0a35cda',
            RedicetURI = window.location.href,
            uri = `https://open.weixin.qq.com/connect/oauth2/authorize?
                    appid=APPID&redirect_uri=RedicetURI&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
        const query = uri.query(true);
        const {code} = query;

        if(code) {
            WechatUserStore.fetchUserInfo(code);

            next();

        } else {

            document.location = generateGetCodeUrl(document.location.href);
        }

    }
    render(){
        return this.state.hasError?
        <h2>页面出错了</h2>
        :(
            <div>
                {/* <AuthRoute></AuthRoute> */}
                <Switch>
                    <Route path='/shouye' component={Shouye} onEnter={this.wechatAuth.bind(this)} ></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        )
    }
}
export default App