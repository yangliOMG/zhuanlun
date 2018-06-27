import React from 'react'
import {  Button, WhiteSpace  ,WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'

import { newOrder} from '../../redux/order.redux'

import {showToast } from '../../util'
import Tem from '../../service/temple-service.jsx'
import './tower.less'
const _temple = new Tem()
const defaultTowImg = 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=e599da6bbea1cd1111bb7a72d87ba399/a8ec8a13632762d0ea469ae4a4ec08fa513dc674.jpg'

@connect(
    state=>state,
    {newOrder}
)
class Tower extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            obj : {},
            care:false
        }
    }
    componentWillMount(){
        const id = this.props.location.hash.replace("#","")
        _temple.getTowerById(id).then(res=>{
            if(res.status === 200){
                this.setState({
                    obj: res.data,
                })
                document.getElementById("navbar").getElementsByClassName('am-navbar-title')[0].innerHTML 
                    = `${res.data.name} ${res.data.tname}`
            }
        })
    }
    handleClick(){
        this.setState({
            care:!this.state.care
        })
        showToast(!this.state.care?'已收藏':'取消收藏')
    }
    handleClickPray(id){
        this.props.newOrder()
        this.props.history.push(`/jpgmall/prayForm#${id}`)
    }

    render(){
        const obj = this.state.obj;
        return (
            <div>
                <WhiteSpace />
                <WingBlank size="lg">
                    <div className='towercontent radius'>
                        <img style={{ width: '100%' }} src={obj.ico||defaultTowImg} alt="" />
                        <WingBlank size="lg">
                            <div className='name'>
                                <div className='l'>已供灯数199</div>    
                                <div className='r'>总灯数200</div>    
                            </div>
                            <div className="string"></div>
                            <div className="infobox">
                                <div className="title">{obj.tname} {obj.name}简介</div>
                                <div className="info">{obj.info}</div>
                            </div>
                            <WhiteSpace size="lg" />
                        </WingBlank>
                    </div>
                    <WhiteSpace size="lg" />
                    <Button 
                        type="warning" className="orangeBtn"
                        onClick={()=>this.handleClickPray(obj.id)}
                        >我要祈福</Button>
                </WingBlank>
                <WhiteSpace size="lg" />
                
            </div>
        )
    }
}

export default Tower;