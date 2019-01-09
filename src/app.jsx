import React from 'react'
import { Route, Switch} from 'react-router-dom';

import Dashboard from './component/dashboard/dashboard.jsx';
import AuthLogin from './component/authLogin/authLogin.jsx';

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
    render(){
        return this.state.hasError?
        <h2>你的系统版本过低，请升级</h2>
        :(
            <AuthLogin>
                <Switch>
                    <Route component={Dashboard}></Route>
                </Switch>
            </AuthLogin>
        )
    }
}
export default App