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
    render(){
        return this.state.hasError?
        <h2>页面出错了</h2>
        :(
            <div>
                {/* <AuthRoute></AuthRoute> */}
                <Switch>
                    <Route path='/shouye' component={Shouye}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        )
    }
}
export default App