import React from 'react'
import { WhiteSpace ,Card } from 'antd-mobile'
import {connect} from 'react-redux'

// import {Redirect} from 'react-router-dom'

// import {update} from '../../redux/user.redux'
@connect(
    state=>state.user,
    // {update}
)
class PrayDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            order : {
                num: 2,
                time:"month",
                total:390000,
                template:"身体健康，万事如意",
                position:[["033","xxxx"],["023","xxxx"]]
            },
            obj : {
                img: 'http://img.mp.sohu.com/upload/20170510/c8503d3f105d43baa3c8db15a08deb7c_th.png',
                title:'灵隐寺 飞来峰 1号塔',
                id:'qwer',
            },
        }
    }

    render(){
        return (
            <div>
                <Card>
                    <Card.Body>
                        <div style={{ textAlign: "center" }}>{this.state.obj.title}佛灯祈福供奉</div>
                        <WhiteSpace />
                        <img style={{ width: '100%'}} src={this.state.obj.img} alt=""/>
                        <WhiteSpace />
                        <div>
                            <div>xxxx：</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;您的朋友yyyy，在{this.state.obj.title}为您点亮了{this.state.order.num}盏佛灯</div>    
                            <div>祝愿您：{this.state.order.template}</div>    
                        </div>  
                        <WhiteSpace />
                        <div style={{ fontSize: '14px', color:'#aaa'}}>
                            <div>供灯位置：{this.state.order.position.map((v,idx)=>v[1]+",")}</div>
                            <div>供灯时长：{this.state.order.time}</div>
                        </div>                       
                    </Card.Body>
                </Card>
                
            </div>
        )
    }
}

export default PrayDetail;