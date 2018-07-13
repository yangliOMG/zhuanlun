import React from 'react'
import { WhiteSpace ,WingBlank, List ,InputItem,TextareaItem,DatePicker,Picker, Toast, Button } from 'antd-mobile'
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
            messageModal2: false,
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
    componentWillMount(){
        const id = this.props.location.hash.replace("#","")
        // let order = this.props.prayList.find(v=>v.id===id)
        // if(order){
        //     this.messageInit(order)
        // }else{
            _order.getOrderByid(id).then(res=>{
                if(res.status === 200){
                    this.messageInit(res.data)
                }else{
                    this.props.history.push('/myPraylist')
                }
            })
        // }
    }
    messageInit(order){
        this.setState({order : order})
        if(order.payStatus===2&&order.blissStatus===2){
            this.handleInput('messageModal2',true)
        }else if(order.payStatus!==2){
            _order.getWechatPayCallback({prayId:order.id,price:'1'}).then(res=>{
                if(res.status===200&&res.data.trade_state==='SUCCESS'){
                    this.messageInit({...order,payStatus:2})
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
            webchatPay({prayId:order.id,sum:order.sum,tid:order.tid})
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
                        <img width='100%' src={require(order.payStatus===2?'./fohou.jpg':'./fohou1.jpg')} alt=""/>
                        <div className='prayText'>
                            <div className='c-black1 art'>
                                {order.payStatus!==2?order.payStatus!==3?
                                    <div className='notpay'>未支付 <span>{(order.sum/100).toFixed(2) }元</span></div>
                                        :
                                    <div className='notpay'>支付超时，请重新下单</div>
                                    :
                                    <div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {order.unick}在{order.tname} {order.fname}点亮了{order.dengwei.length}盏佛灯</div>    
                                    <div className={`${order.blessing?'':'hidden'}`}>祝愿：{order.blessing}</div></div>
                                }

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


                <Popup messageModal={this.state.messageModal2} shutdown={this.onClose('messageModal2')}>
                    <div className='messageModal'>
                        <div className='title'>填写完整信息，获得升疏(表)</div>
                        <div className='content'>上表升疏是向神佛陈情之章奏，需严肃慎重。凡升疏（表）者，需在疏（表）文中明确自己的住址、姓名、生辰及所求之事。代别人升表
                            者，可以写当事人名，也可以写委托人名</div>
                        <div className='btnArea'>
                            <div className='btnBlock'></div>
                            <div className='btnBlock'><div className='bg-grey1 anniu' onClick={this.onClose('messageModal2')}>取消</div></div>
                            <div className='btnBlock'><div className='orangeBg anniu' onClick={()=>this.setState({messageModal:true,messageModal2:false})}>确认</div></div>
                        </div>
                    </div>
                </Popup>
                
                <Popup messageModal={this.state.messageModal} shutdown={this.onClose('messageModal')}>
                    <div className='messageModal'>
                        <List>
                            <InputItem placeholder="福佑联系人姓名"
                                onChange={v=>this.handleInput('name',v)}
                            >姓名：</InputItem>
                            <InputItem placeholder="福佑联系人电话"
                                onChange={v=>this.handleInput('phone',v)}
                            >电话：</InputItem>
                            <List.Item
                            >性别：
                                <label htmlFor="male" className='radioBlock'>
                                    <input type="radio" name="radio" id="male" onChange={v=>this.handleInput('sex','1')}/>男
                                </label>
                                <label htmlFor="female" className='radioBlock'>
                                    <input type="radio" name="radio" id="female" onChange={v=>this.handleInput('sex','2')}/>女
                                </label>
                            </List.Item>
                            <DatePicker mode="date" title="生日" extra="福佑联系人生日" value={this.state.birthday} 
                                minDate={new Date(1900,1,1)} maxDate={new Date()} onChange={birthday => this.setState({ birthday })}
                                >
                                <List.Item arrow="horizontal">生日：</List.Item>
                            </DatePicker>
                            <Picker extra="所在地区" cols={2}
                                data={District}
                                title="地址选择"
                                value={this.state.address}
                                onOk={address => this.setState({ address })}
                                onChange={address => this.setState({ address })}
                                >
                                <List.Item id='addrPicker' arrow="horizontal">地址：</List.Item>
                            </Picker>
                            <TextareaItem className="textarea" title="祈愿："
                                onChange={v=>this.handleInput('thing',v)}
                                rows={3} autoHeight placeholder={'请输入所求之事'}
                                >
                            </TextareaItem>
                        </List>
                        <div className='btnArea'>
                            <div className='btnBlock'><div className='bg-grey1 anniu' onClick={this.onClose('messageModal')}>取消</div></div>
                            <div className='btnBlock'><div className='orangeBg anniu' onClick={()=>this.handleSubMes()}>确认</div></div>
                        </div>
                    </div>
                </Popup>

                <div className={`dbssBlock ${this.state.src===''?'hidden':'showin'} ${this.state.burning?'burnings':''}`}>
                    <img src={this.state.src} alt=""/> 
                    <div className={`burnBtn  ${this.state.burning?'bg-grey1':'orangeBg'}`} onClick={()=>this.handleBurning()}>点击开始焚化</div>
                    <div className={`burnBlock ${this.state.burning?'burning':''}`}></div>
                </div>
                
            </div>
        )
    }
}

export default PrayDetail;