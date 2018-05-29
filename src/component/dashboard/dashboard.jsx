import React from 'react'
import {connect} from 'react-redux'
import {NavBar,Icon} from 'antd-mobile'
import { Route, Redirect} from 'react-router-dom' 
// import QueueAnim from 'rc-queue-anim';
import { AnimatedSwitch } from 'react-router-transition';


import TempleList from '../../pray/templeList/templeList.jsx'
import PrayForm from '../../pray/prayForm/prayForm.jsx'
import TempleDetail from '../../pray/templeDetail/templeDetail.jsx'
import Template from '../../pray/template/template.jsx'
import LampDetail from '../../pray/lampDetail/lampDetail.jsx'
import PrayDetail from '../../pray/prayDetail/prayDetail.jsx'


import Temple from '../../pray/temple/temple.jsx'
import Tower from '../../pray/tower/tower.jsx'

import PersonalCenter from '../../personal/personalCenter/personalCenter.jsx'
import MyPraylist from '../../personal/myPraylist/myPraylist.jsx'
import MyCarelist from '../../personal/myCarelist/myCarelist.jsx'
import MyHistory from '../../personal/myHistory/myHistory.jsx'
// import {getMsgList,recvMsg} from '../../redux/chat.redux.jsx'

import {setStorage, getStorage, comparePath} from '../../util'

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
    //     window.onscroll = function(){ 
    //         var t = document.documentElement.scrollTop || document.body.scrollTop;  
    //         console.log(t)
    //    } 
    }
    handleLeftClick(path){
        if(path === '/prayDetail'){
            this.props.history.push("/myPraylist")
        }else if(path === '/myPraylist'){
            this.props.history.push('/personalCenter')
        }else{
            this.props.history.goBack()
        }
    }
    render(){
        const {pathname}  = this.props.location
        const navList = [
            {path:'/templeList',title:'寺院列表',component:TempleList,father:['/shouye'],son:['/temple']},
            {path:'/temple',title:'temple',component:Temple,father:['/templeList','/myCarelist','/myHistory'],son:['/templeDetail','/tower']},
            {path:'/templeDetail',title:'寺院详情',component:TempleDetail,father:['/temple'],son:[]},
            {path:'/tower',title:'tower',component:Tower,father:['/temple','/myCarelist','/myHistory'],son:['/prayForm']},
            {path:'/prayForm',title:'祈福供灯',component:PrayForm,father:['/tower'],son:['/template','/lampDetail']},
            {path:'/template',title:'祈福语',component:Template,father:['/prayForm'],son:[]},
            {path:'/lampDetail',title:'选择灯位',component:LampDetail,father:['/prayForm'],son:[]},

            {path:'/prayDetail',title:'供灯详情',component:PrayDetail,father:['/prayForm','/myPraylist'],son:[]},

            {path:'/personalCenter',title:'个人中心',component:PersonalCenter,father:[],son:['/myCarelist','/myHistory','/myPraylist']},
            {path:'/myPraylist',title:'我的祈福',component:MyPraylist,father:['/personalCenter'],son:['/prayDetail']},
            {path:'/myCarelist',title:'我的收藏',component:MyCarelist,father:['/personalCenter'],son:['/temple','/tower']},
            {path:'/myHistory',title:'我的足迹',component:MyHistory,father:['/personalCenter'],son:['/temple','/tower']},

        ]
        const page = navList.find(v=>v.path===pathname)

        if(page){
            let lastPath = getStorage('lastPath')
            let plus = comparePath(lastPath,page) === 'father'? -1:1
            setStorage('lastPath',pathname)
            const height = document.documentElement.clientHeight -45
            return (
                <div>
                    <NavBar id="navbar" icon={<Icon type="left" />} mode='dard' onLeftClick={()=>this.handleLeftClick(page.path)}>{page.title}</NavBar>
                    <AnimatedSwitch
                        atEnter={{ opacity: 0, foo: 0 }}
                        atLeave={{ opacity: 0, foo: 2 }}
                        atActive={{ opacity: 1, foo: 1 }}
                        mapStyles={(styles) => {
                            let x = plus * (styles.foo-1)*100
                            let val = x===0? 'none': 'translateX(' + x + '%)'
                            return {
                                position: (styles.foo <= 1) ? 'relative': 'absolute',
                                width: '100%',
                                height: height+'px',
                                opacity: styles.opacity,
                                transform: val
                            }
                        }}
                        >
                        {/* <QueueAnim type={page.type}> */}
                            {/* <Switch>
                                {navList.map(v=> */}
                                    <Route key={page.path} path={page.path} component={page.component}></Route>
                                {/* )}
                            </Switch> */}
                        {/* </QueueAnim> */}
                        </AnimatedSwitch>
                </div>
            )
        }else{
            return <Redirect to='/shouye'></Redirect>
        }
    }
}

export default Dashboard;