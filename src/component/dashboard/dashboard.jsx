import React from 'react'
import { Route, Redirect} from 'react-router-dom' 
// import QueueAnim from 'rc-queue-anim';
import { AnimatedSwitch } from 'react-router-transition';

import {setStorage, getStorage, comparePath,} from '../../util'
import asyncComponent from './AsyncComponent'

const Gongde = asyncComponent(() => import("../../pray/introduce/gongde.jsx"))
const Haochu = asyncComponent(() => import("../../pray/introduce/haochu.jsx"))
const Yuanqi = asyncComponent(() => import("../../pray/introduce/yuanqi.jsx"))
const TempleList = asyncComponent(() => import("../../pray/templeList/templeList.jsx"))
const PrayForm = asyncComponent(() => import("../../pray/prayForm/prayForm.jsx"))
const TempleDetail = asyncComponent(() => import("../../pray/templeDetail/templeDetail.jsx"))
const Template = asyncComponent(() => import("../../pray/template/template.jsx"))
const LampDetail = asyncComponent(() => import("../../pray/lampDetail/lampDetail.jsx"))
const PrayDetail = asyncComponent(() => import("../../pray/prayDetail/prayDetail.jsx"))
const Temple = asyncComponent(() => import("../../pray/temple/temple.jsx"))

const PersonalCenter = asyncComponent(() => import("../../personal/personalCenter/personalCenter.jsx"))
const MyPraylist = asyncComponent(() => import("../../personal/myPraylist/myPraylist.jsx"))
const MyCarelist = asyncComponent(() => import("../../personal/myCarelist/myCarelist.jsx"))
const MyHistory = asyncComponent(() => import("../../personal/myHistory/myHistory.jsx"))
const MyPhone = asyncComponent(() => import("../../personal/myPhone/myPhone.jsx"))
const MySuggest = asyncComponent(() => import("../../personal/mySuggest/mySuggest.jsx"))

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
        let height = document.documentElement.clientHeight
        document.getElementById('root').style.height = height +'px'
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
            {path:'/gongde',title:'供灯功德',component:Gongde,father:[],son:['/temple']},
            {path:'/haochu',title:'供灯意义',component:Haochu,father:[],son:['/temple']},
            {path:'/yuanqi',title:'供灯缘起',component:Yuanqi,father:[],son:['/temple']},

            {path:'/templeList',title:'寺院列表',component:TempleList,father:[],son:['/temple']},
            {path:'/temple',title:'寺院',component:Temple,father:['/templeList','/myCarelist','/myHistory'],son:['/templeDetail','/pay/prayForm']},
            {path:'/templeDetail',title:'寺院详情',component:TempleDetail,father:['/temple'],son:[]},
            // {path:'/tower',title:'祈福塔',component:Tower,father:['/temple','/myCarelist','/myHistory'],son:['/pay/prayForm']},
            {path:'/pay/prayForm',title:'祈福供灯',component:PrayForm,father:['/temple'],son:['/template','/lampDetail']},
            {path:'/template',title:'祈福语',component:Template,father:['/pay/prayForm'],son:[]},
            {path:'/lampDetail',title:'选择灯位',component:LampDetail,father:['/pay/prayForm'],son:[]},

            {path:'/pay/prayDetail',title:'供灯详情',component:PrayDetail,father:['/pay/prayForm','/myPraylist','/personalCenter'],son:[]},

            {path:'/personalCenter',title:'个人中心',component:PersonalCenter,father:[],son:['/myCarelist','/myHistory','/myPraylist','/myPhone','/mySuggest','/pay/prayDetail']},
            {path:'/myPraylist',title:'我的祈福',component:MyPraylist,father:['/personalCenter'],son:['/pay/prayDetail']},
            {path:'/myCarelist',title:'我的收藏',component:MyCarelist,father:['/personalCenter'],son:['/temple','/tower']},
            {path:'/myHistory',title:'我的足迹',component:MyHistory,father:['/personalCenter'],son:['/temple','/tower']},
            {path:'/myPhone',title:'绑定手机号',component:MyPhone,father:['/personalCenter'],son:[]},
            {path:'/mySuggest',title:'意见反馈',component:MySuggest,father:['/personalCenter'],son:[]},

        ]
        const page = navList.find(v=>v.path===pathname)
        if(page){
            let lastPath = getStorage('lastPath')
            let plus = comparePath(lastPath,page) === 'father'? -1:1
            setStorage('lastPath',pathname)
            let height = 500
            if(typeof document !== 'undefined'){
                height = document.documentElement.clientHeight
                document.title = page.title
            }
            return (
                <div>
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
            return <Redirect to='/temple'></Redirect>
        }
    }
}

export default Dashboard;