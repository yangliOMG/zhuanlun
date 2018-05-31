import React from 'react'
import { List, WhiteSpace ,Card} from 'antd-mobile'
import {connect} from 'react-redux'
import FontAwesome from 'react-fontawesome';

import { getStorage } from '../../util'

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
            user : {
                nick: "登录",
                headImgURL:"",
                openid:''
            },
        }
    }
    componentDidMount(){
        const user = getStorage('user')
        if(user!==''){
            setTimeout(() => {
                this.setState({
                    user
                })
            }, 1000);
        }
    }

    render(){
        const Item = List.Item
        const headImgURL = this.state.user.headImgURL
        const namelist = [
                {title:"我的祈福",path:'/myPraylist',fontname:'heart',color:'red'},
                {title:"我的收藏",path:'/myCarelist',fontname:'star',color:'orange'},
                {title:"浏览记录",path:'/myHistory',fontname:'clock-o',color:'grey'},
            ]
        return (
            <div>
                <Card style={{background:`url(https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1561316612,2686683880&fm=27&gp=0.jpg) `}}>
                    <Card.Body>
                        <table style={{height: "100px", margin:"0 auto"}} >
                            <tbody>
                                <tr>
                                    <td><div className="headImgDiv">
                                        <img id="img" height="60" width="60" src={headImgURL||require("./default_photo.jpg")} alt="" />
                                    </div></td>
                                </tr>
                                <tr>
                                    <td><div style={{textAlign:"center", color:"white"}} >{this.state.user.nick}</div></td>
                                </tr>
                            </tbody>
                        </table>                    
                        
                    </Card.Body>
                </Card>
                <WhiteSpace/>
                <List>
                    {namelist.map((v,idx)=>
                        <Item key={v.path}
                            arrow="horizontal" 
                            onClick={() => this.props.history.push(v.path)} 
                            thumb={<FontAwesome name={v.fontname} style={{ color: v.color }} />}
                        >{v.title}</Item>
                    )}
                </List>
            </div>
        )
    }
}

export default PersonalCenter;