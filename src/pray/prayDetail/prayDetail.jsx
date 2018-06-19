import React from 'react'
import { WhiteSpace ,Card } from 'antd-mobile'
import {connect} from 'react-redux'

import Order from '../../service/order-service.jsx'

// import {update} from '../../redux/user.redux'
const _order = new Order()
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
                duration:1,
                total:390000,
                blessing:"身体健康，万事如意",
                type:1,
                adds:[["033","xxxx"],["023","xxxx"]],
                tname:'灵隐寺',
                fname:'测试一号',
                createtime:'2018-06-19 13:45:33',
            },
            obj : {
                img: 'http://img.mp.sohu.com/upload/20170510/c8503d3f105d43baa3c8db15a08deb7c_th.png',
                id:'qwer',
            },
        }
    }
    componentWillMount(){
        // const id = this.props.location.hash.replace("#","")
        // if(id){
        //     _order.getWechatPayCallback({prayId:id,price:'1'}).then(res=>{
        //         if(res.status === 200){
                    // this.setState({
                    //     order: res.data,
                    // })
        //         }
        //     })
        // }
    }

    render(){
        const btnList = {1:'1天',30:'1月',365:'1年',[-1]:'长期'}
        return (
            <div>
                <Card>
                    <Card.Body>
                        <div style={{ textAlign: "center" }}>{this.state.order.tname} {this.state.order.fname}佛灯祈福供奉</div>
                        <WhiteSpace />
                        <img style={{ width: '100%'}} src={this.state.obj.img} alt=""/>
                        <WhiteSpace />
                        <div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;您在{this.state.order.tname} {this.state.order.fname}点亮了{this.state.order.num}盏佛灯</div>    
                            <div>祝愿：{this.state.order.blessing}</div>    
                        </div>  
                        <WhiteSpace />
                        <div style={{ fontSize: '14px', color:'#aaa'}}>
                            <div>供灯位置：{this.state.order.adds.map((v)=>v[0]+v[1]+" ")}</div>
                            <div>供灯时长：{btnList[this.state.order.duration]}</div>
                            <div>创建时间：{this.state.order.createtime}</div>
                        </div>                       
                    </Card.Body>
                </Card>
                
            </div>
        )
    }
}

export default PrayDetail;