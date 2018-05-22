import React from 'react'
import {connect} from 'react-redux'
import {NavBar,Icon} from 'antd-mobile'
import { Route, Redirect} from 'react-router-dom' 
// import QueueAnim from 'rc-queue-anim';


import TempleList from '../../pray/templeList/templeList.jsx'
import PrayForm from '../../pray/prayForm/prayForm.jsx'
import Template from '../../pray/template/template.jsx'
import LampDetail from '../../pray/lampDetail/lampDetail.jsx'

import PersonalCenter from '../../personal/personalCenter/personalCenter.jsx'
// import {getMsgList,recvMsg} from '../../redux/chat.redux.jsx'

@connect(
    state=>state,
    // {getMsgList,recvMsg}
)
class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:'',
        }
    }
    componentDidMount(){
        // if(!this.props.chat.chatmsg.length){
        //     this.props.getMsgList();
        //     this.props.recvMsg();
        // }
    }
    render(){
        const {pathname}  = this.props.location
        const navList = [
            {path:'/templeList',title:'寺院列表',component:TempleList,},
            {path:'/prayForm',title:'祈福供灯',component:PrayForm,},
            {path:'/template',title:'祈福语',component:Template,},
            {path:'/lampDetail',title:'选择灯位',component:LampDetail,},
            {path:'/personalCenter',title:'个人中心',component:PersonalCenter,},
        ]
        const page = navList.find(v=>v.path===pathname)
        return page?(
            <div>
                <NavBar icon={<Icon type="left" />} mode='dard' onLeftClick={()=>this.props.history.goBack()}>{page.title}</NavBar>
                <div>
                    {/* <QueueAnim type={page.type}> */}
                        {/* <Switch>
                            {navList.map(v=> */}
                                <Route key={page.path} path={page.path} component={page.component}></Route>
                            {/* )}
                        </Switch> */}
                    {/* </QueueAnim> */}
                </div>
            </div>
        ): <Redirect to='/shouye'></Redirect>
    }
}

export default Dashboard;