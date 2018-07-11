import React from 'react'
import { WhiteSpace ,WingBlank, List ,InputItem,TextareaItem,DatePicker,Picker,Modal, Toast, Button } from 'antd-mobile'
import {connect} from 'react-redux'
import District from './area'
import {duringDictionary, dateDictionary, showToast, directionDictionary, cengConvert, timeFormat } from '../../util'
import Popup from '../../component/userMesTable/userMesTable.jsx'
import {updateOrder} from '../../redux/order.redux'

import Order from '../../service/order-service.jsx'
import './prayDetail.less'
import {webchatPay } from '../prayForm/wechatPay.js'

// import asyncComponent from '../../component/dashboard/AsyncComponent'
// const District = asyncComponent(() => import("./area"))
const _order = new Order()
@connect(
    state=>state.prayList,
    {updateOrder}
)
class PrayDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            order : {
                num: 2,
                duration:1,
                total:390000,
                unick:"xxx",
                blessing:"身体健康，万事如意",
                type:1,
                dengwei:[],
                tname:'xxx',
                fname:'xxx',
                createTime:'',
            },
            obj : {
                id:'qwer',
            },
            show:false,
            messageModal: false,
            name:'',
            phone:'',
            sex:'',
            birthday:'',
            address:'',
            thing:'',
            src:'',
            burning:false,
        }
    }
    componentDidMount(){
        const id = this.props.location.hash.replace("#","")
        let order = this.props.prayList.find(v=>v.id===id)
        if(order){
            this.messageInit(order)
        }else{
            _order.getOrderByid(id).then(res=>{
                if(res.status === 200){
                    this.messageInit(res.data)
                }else{
                    this.props.history.push('/myPraylist')
                }
            })
        }
    }
    messageInit(order){
        this.setState({order : order})
        if(order.payStatus===2&&order.blissStatus===2){
            const content = '上表升疏是向神佛陈情之章奏，需严肃慎重。凡升疏（表）者，需在疏（表）文中明确自己的住址、姓名、生辰及所求之事。代'+
                '别人升表者，可以写当事人名，也可以写委托人名'
            const style = {background: 'linear-gradient(to right bottom,#ffa800,#ff6300)',color: 'white',borderRadius:'27px',height: '34px',lineHeight: '34px'}
            Modal.alert('填写完整信息，获得升疏(表)', content, [
                { text: '取消', onPress: () => {},style:{...style,background:'#999'} },
                { text: '确认', onPress: () => this.handleInput('messageModal',true),style:{...style,marginLeft:'10px'} },
            ],'android')
        }else if(order.payStatus!==2){
            _order.getWechatPayCallback({prayId:order.id,price:'1'}).then(res=>{
                if(res.status===200&&res.data.trade_state==='SUCCESS'){
                    this.setState({order:{...this.state.order,payStatus:2}})
                }
            })
        }
    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({[key]: true})
    }
    onClose = key => () => {
        this.setState({[key]: false})
    }
    handleInput(key,value){
        this.setState({[key]: value})
    }
    handleSubMes(){
        let blissMan = {}
        let id = this.props.location.hash.replace("#","")
            blissMan.name = this.state.name
            blissMan.phone = this.state.phone
            blissMan.sex = (this.state.sex*1) ||0  //1男 2女 0未知
            blissMan.birthday = dateDictionary(this.state.birthday)
            blissMan.address = document.getElementById('addrPicker').getElementsByClassName('am-list-extra')[0].innerHTML.replace(/,/g,'')
            blissMan.thing = this.state.thing
            blissMan.pid = id
        if(!blissMan.name){
            return showToast('请输入姓名')
        }else if(!blissMan.phone){
            return showToast('请输入电话')
        }else if(!blissMan.sex){
            return showToast('请选择性别')
        }
        Toast.loading('升疏生成中...',0)
        _order.createBlissMan(blissMan).then(res=>{
            if(res.status === 200){
                return 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
            }
        }).then(data =>{
            this.setState({src: data})
            Toast.hide()
        })
        this.onClose('messageModal')()
    }
    handleBurning(){
        if(this.state.burning){
            return true
        }
        this.setState({burning: true})
        setTimeout(() => {
            showToast('焚化完成')
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }, 8000)
    }
    handleClickReback(){
        const order = this.state.order
        if(order.payStatus===2){
            this.props.history.push('/personalCenter')
        }else if(order.payStatus===1){
            // let blessing = order.blessing,
            //     num = order.dengwei.length, 
            //     duration = order.duration, 
            //     position = order.dengwei.map(v=>([
            //         v.address,
            //         [`${directionDictionary(v.side-1)}${cengConvert(v.row-1,15)}层第${(Number(v.col)+"").padStart(2,0)}位`,
            //             `${directionDictionary(v.side-1)}${cengConvert(v.row-1,15)}${v.col}`,
            //             `${v.side-1},${v.row-1},${v.col-1}`]])), 
            //     total = order.sum,
            //     id = order.id
            // this.props.updateOrder({blessing,num,duration,position,total,id})
            // this.props.history.push('/jpgmall/prayForm#'+order.fid)
            // window.location.href = `/jpgmall/prayForm#${order.id}`
            new Promise(webchatPay({prayId:order.id,sum:order.sum,tid:order.tid})).then(res=>console.log(res))
        }else{
            this.props.history.push('/temple')
        }
    }

    render(){
        const order = this.state.order
        //computed
        const during = duringDictionary().find(v=>v.type===order.duration).name

        return (
            <div>
                <WhiteSpace/>
                <WingBlank size="lg">
                    <div className='prayDetail'>
                        <div className='prayText'>
                            <div className='c-black1 art'>
                                订单详情
                            </div>
                            <div className='inf'>
                                <div className='leftBlock c-erji'>
                                    <p className={this.state.show?'':'text-overflow2'} onClick={()=>this.setState({show:!this.state.show})}>
                                        供灯位置：{order.dengwei.map(val=>
                                        `${directionDictionary(val.side-1)}面${cengConvert(val.row-1,15)}层${(Number(val.col)+"").padStart(2,0)}位、`)}</p>
                                    <p>供灯时长：{during}</p>
                                    <p>创建时间：{timeFormat(order.createTime).toLocaleString()}</p>
                                </div>
                                <div className='rightBlock'>
                                    <img width='100%' src={require('./qrcode.jpg')} alt=""/>
                                </div>
                            </div>                       
                        </div>  
                    </div>
                    <WhiteSpace/>
                    <Button type="warning" className="orangeBtn"
                        onClick={()=>this.handleClickReback()}
                    >{order.payStatus!==2?order.payStatus!==3?'去支付':'重新下单':'返回'}</Button>
                </WingBlank>
                <WhiteSpace/>
            </div>
        )
    }
}

export default PrayDetail;