import React from 'react'
import { List, WhiteSpace , WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import FontAwesome from 'react-fontawesome';

// import {update} from '../../redux/user.redux'
import "./personalCenter.css"
@connect(
    state=>state.user,
    // {update}
)
class PersonalCenter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        const Item = List.Item
        const namelist = [
                {title:"我的祈福",path:'/myPraylist',fontname:'heart',color:'red'},
                {title:"我的收藏",path:'/myCarelist',fontname:'star',color:'orange'},
                {title:"我的足迹",path:'/myHistory',fontname:'clock-o',color:'grey'},
                {title:"手机绑定",path:'/myPhone',fontname:'phone',color:'#108ee9'},
                {title:"意见反馈",path:'/mySuggest',fontname:'commenting',color:'grey'},
            ]
        return (
            <div>
                <WhiteSpace/>
                <WingBlank size="sm" className='radius ofhd'>
                    <List>
                        <table style={{height: "120px", margin:"0 auto"}} >
                            <tbody>
                                <tr>
                                    <td><div className="headImgDiv mt-15">
                                        <img id="img" height="60" width="60" src={this.props.headImgURL||require("./default_photo.jpg")} alt="" />
                                    </div></td>
                                </tr>
                                <tr>
                                    <td><div className='text-c f-16'>{this.props.nick||"登录"}</div></td>
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