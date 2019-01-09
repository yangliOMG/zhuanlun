import React from 'react'
import { List, WhiteSpace , WingBlank} from 'antd-mobile'
import FontAwesome from 'react-fontawesome';

import { removeStorage,getStorage } from '../../util'
import { withContext } from '../../context'
import {ajaxPraylist} from '../../service/asyncFun'

import "./personalCenter.css"

@withContext
class PersonalCenter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
        let { prayList, save} = this.props.context
        if( prayList.list.length===0){
            ajaxPraylist( res=>{
                prayList.list = res
                save({prayList})
            })
        }
        // setTimeout(() => {          //!!!!!!!!!!!
        //     save({user:getStorage('user')})
        // }, 500);
    }

    handleClick(){
        if(false){
            removeStorage('user');alert('清除缓存')
        }
    }

    render(){
        let { user } = this.props.context
        const Item = List.Item
        const namelist = [
                {title:"我的祈福",path:'/myPraylist',fontname:'heart',color:'red'},
                {title:"我的足迹",path:'/myHistory',fontname:'clock-o',color:'grey'},
                {title:"手机绑定",path:'/myPhone',fontname:'phone',color:'#108ee9'},
                {title:"意见反馈",path:'/mySuggest',fontname:'commenting',color:'grey'},
            ]
        const headImg = user.headImgURL || getStorage('user').headImgURL
        const nick = user.nick || getStorage('user').nick
        return (
            <div>
                <WhiteSpace/>
                <WingBlank size="sm" className='radius ofhd'>
                    <List>
                        <table style={{height: "120px", margin:"0 auto"}} >
                            <tbody>
                                <tr>
                                    <td><div className="headImgDiv mt-15" onClick={()=>this.handleClick()}>
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