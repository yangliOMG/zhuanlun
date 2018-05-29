import React from 'react'
import { List, Button, WhiteSpace  , Stepper, TextareaItem, Modal} from 'antd-mobile'
import {connect} from 'react-redux'

// import {update} from '../../redux/user.redux'
import PrayNavbar from '../../component/prayNavbar/prayNavbar.jsx'
import LampDetail from '../../pray/lampDetail/lampDetail.jsx'
import Template from '../../pray/template/template.jsx'

import {updateOrder} from '../../redux/order.redux'
// import Order from '../../service/order-service.jsx'
import {showToast } from '../../util'
import {webchatPay } from './wechatPay.js'


import './prayForm.css'

// const _order = new Order()
@connect(
    state=>state,
    {updateOrder}
)
class PrayForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            obj :{
                img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526464293949&di=1cf8a781791ec773f4faaff41ccb3dc8&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F2fdda3cc7cd98d10015049ac2b3fb80e7aec90a2.jpg',
                title:'飞来峰1号祈福塔',
                id:'ta123',
                des: '灵隐寺飞来峰1号祈福塔简介',
            },
            num: this.props.order.num,
            price:{
                day:980,
                month:1980,
                year:19900,
                all:360000
            },
            time:this.props.order.time,
            total:0,
            template:this.props.order.template,
            position:this.props.order.position,
            modal2: false,
            modal1: false,
        }
    }

    handleNumChange(num){
        let position = this.state.position
        if( num < position.length){
            position = position.slice(0,num)
        }
        this.setState({num,position,})
        this.props.updateOrder({num,position})
    }
    handleTimeBtnClick(time){
        this.setState({time,}) 
        this.props.updateOrder({time})
    }
    handleTextarea(template){
        this.setState({template})
        this.props.updateOrder({template})
    }
    handlePay(){
        let order = this.props.order
        order.total = (this.state.price[this.state.time]||0)* this.state.num
        if(order.num !== order.position.length){
            return showToast('请完善供灯位置')
        }
        if(order.time===""){
            return showToast('请选择时长')
        }
        webchatPay(this.state.price)
        
        // _order.createOrder(order).then(res=>{
            // console.log(res)
            // this.props.updateOrder(order)
            // this.props.history.push('/prayDetail#123')
        // })
    }

    showModal(key,e){
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => (value) => {
        this.setState({
            [key]: false,
            ...value
        });
    }


    render(){
        const obj = this.state.obj
        const chos = this.state.time
        const Item = List.Item
        const Brief = Item.Brief
        const btnList = [{type:'day',name:'1天'},{type:'month',name:'1月'},{type:'year',name:'1年'},{type:'all',name:'长期'}]
        const total = (this.state.price[this.state.time]||0)* this.state.num
        return (
            <div>
                <PrayNavbar />
                <List>
                    <WhiteSpace />
                    <div style={{ textAlign: 'center',position:'relative' }}>
                        <img style={{ maxHeight: '120px' }} src={obj.img} alt="" />
                        <WhiteSpace />
                        <div>{obj.title}</div>
                        <WhiteSpace />
                    </div>
                </List>
                <List>
                    <Item 
                        extra={<Stepper style={{ width: '100%', minWidth: '100px' }} 
                                        showNumber max={10} min={1} 
                                        value={this.state.num}
                                        onChange={(v) =>this.handleNumChange(v)}
                                />}
                    >供灯数量</Item>
                    <Item multipleLine
                    >供灯时长
                        <Brief>
                            {btnList.map((v,idx)=>
                                <Button className="radiobutton" size="small" inline key={v.type}
                                    type={chos===v.type?'primary':'ghost'}
                                    onClick={()=>this.handleTimeBtnClick(v.type)}>{v.name}</Button>
                            )}
                        </Brief>
                    </Item>
                </List>
                <List>
                    <Item 
                        arrow="horizontal" className="def-listitem"
                        extra={this.state.position.map((v,idx)=>this.state.position.length===idx+1?v[0]:v[0]+',')}
                        onClick={(e) => this.showModal('modal2', e)}
                    >供灯位置</Item>
                </List>
                <List>
                    <Item 
                        arrow="horizontal"
                        extra={'使用模板'}
                        onClick={(e) => this.showModal('modal1', e)}
                    >祈福语</Item>
                    <TextareaItem 
                        onChange={v=>this.handleTextarea(v)}
                        rows={3}
                        count={100}
                        autoHeight
                        placeholder={'请输入'}
                        value={this.state.template}
                        >
                    </TextareaItem>
                </List>
                
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                
                <div className='stick-footer'>  
                    <div style={{flex: '1 1',background:'orange' }} >供灯金额：￥{(total/100).toFixed(2)}</div>
                    <a className="payBtn" style={{flex: '1 1' }} onClick={()=>{this.handlePay()}}>确认祈福</a>
                </div>


                <Modal 
                    visible={this.state.modal2}
                    transitionName ='slide-right'
                    maskTransitionName  ='slide-right'
                    >
                    <LampDetail onClose={this.onClose('modal2')} />
                </Modal>
                <Modal 
                    visible={this.state.modal1}
                    transitionName ='slide-right'
                    maskTransitionName  ='slide-right'
                    >
                    <Template onClose={this.onClose('modal1')} />
                </Modal>
            </div>
        )
    }
}

export default PrayForm;