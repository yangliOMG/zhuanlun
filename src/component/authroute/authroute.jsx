import React from 'react'
import {withRouter} from 'react-router-dom'     ///!!!!!
import axios from 'axios'
import {connect} from 'react-redux'

import {loadData} from '../../redux/user.redux'

@withRouter///!!!!!
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component{
    // constructor(props){
    //     super(props);
    // }
    componentDidMount(){
        const publicList = ['/login','/register']
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname)>-1){
            return null
        }
        axios.get('/user/info')
            .then(res=>{
                if(res.status===200){
                    if(res.data.code===0){
                        this.props.loadData(res.data.data)  //redux加载用户信息数据
                    }else{
                        this.props.history.push('/login');///!!!!!
                    }
                }
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