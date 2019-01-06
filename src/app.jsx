import React from 'react'
import { Route, Switch} from 'react-router-dom';

import AuthLogin from './component/authLogin/authLogin.jsx';
import Dashboard from './component/dashboard/dashboard.jsx';

class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            hasError:false,
            err:''
        }
    }
    componentDidCatch(err,info){
        this.setState({
            hasError:true,
            err
        })
    }
    render(){
        const { hasError, err} = this.state
        return hasError?
        <div>
            <h2>你的系统版本过低，请升级</h2>
            <div>{ err.stack?err.stack.toString():err.toString()}</div>
        </div>
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