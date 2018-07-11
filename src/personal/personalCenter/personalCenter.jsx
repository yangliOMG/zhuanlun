import React from 'react'
import { List, WhiteSpace , WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import FontAwesome from 'react-fontawesome';
import { removeStorage,getStorage } from '../../util'
import Order from '../../service/order-service.jsx'
import {savePrayList} from '../../redux/pray.redux'

// import {update} from '../../redux/user.redux'
import "./personalCenter.css"
const _order = new Order()
@connect(
    state=>state,
    {savePrayList}
)
class PersonalCenter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentWillMount(){
        if(this.props.prayList.prayList.length===0){
            _order.getOrderList().then(res=>{
                if(res.status === 200){
                    this.props.savePrayList(res.data)
                }
            })
        }
    }

    render(){
        const Item = List.Item
        const namelist = [
                {title:"我的祈福",path:'/myPraylist',fontname:'heart',color:'red'},
                // {title:"我的收藏",path:'/myCarelist',fontname:'star',color:'orange'},
                {title:"我的足迹",path:'/myHistory',fontname:'clock-o',color:'grey'},
                {title:"手机绑定",path:'/myPhone',fontname:'phone',color:'#108ee9'},
                {title:"意见反馈",path:'/mySuggest',fontname:'commenting',color:'grey'},
            ]
        const headImg = this.props.user.headImgURL || getStorage('user').headImgURL
        const nick = this.props.user.nick || getStorage('user').nick
        return (
            <div>
                <WhiteSpace/>
                <WingBlank size="sm" className='radius ofhd'>
                    <List>
                        <table style={{height: "120px", margin:"0 auto"}} >
                            <tbody>
                                <tr>
                                    <td><div className="headImgDiv mt-15" onClick={()=>{removeStorage('user');alert('清除缓存')}}>
                                        <img id="img" height="60" width="60" src={headImg||require("./default_photo.jpg")} alt="" />
                                    </div></td>
                                </tr>
                                <tr>
                                    <td><div className='text-c f-16'>{nick||"登录"}</div></td>
                                </tr>
                            </tbody>
                        </table>                    
                    </List>
                    <List>
                        {namelist.map((v,idx)=>
                            <Item key={v.path}
                                arrow="horizontal" 
                                onClick={() => this.props.history.push(v.path)} 
                                thumb={<FontAwesome name={v.fontname} style={{ color: v.color }} />}
                            >{v.title}</Item>
                        )}
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default PersonalCenter;