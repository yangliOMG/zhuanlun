import React from 'react'
import { WhiteSpace ,WingBlank, List ,InputItem,TextareaItem,DatePicker,Picker, Toast, Button } from 'antd-mobile'
import {connect} from 'react-redux'

import District from './area'
import {duringDictionary, dateDictionary, showToast, timeFormat, positionMesArray } from '../../util'
import Popup from '../../component/userMesTable/userMesTable.jsx'

import {webchatPay } from '../prayForm/wechatPay.js'
import { TO_GET_ORDERDETAIL, TO_GET_BLISS } from '../../constant/actionType'

import './prayDetail.less'

@connect( ({prayList})=>prayList,
    dispatch => ({
        getOrderDetail: (payload, callback, callback2) => dispatch({type: TO_GET_ORDERDETAIL, payload, callback, callback2}),
        createBlissMan: (payload, callback) => dispatch({type: TO_GET_BLISS, payload, callback}),
    })
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
            followFlag:false
        }
    }
    componentWillMount(){
        const id = this.props.location.hash.replace("#","")
        this.props.getOrderDetail({id},(order, followFlag)=>{
            this.setState({order, followFlag})
        },(mes)=>{
            // this.props.history.push('/myPraylist')
            console.log(mes)
        })
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
        const { name, phone, sex, birthday, thing} = this.state
        let blissMan = {}
        let id = this.props.location.hash.replace("#","")
            blissMan.name = name
            blissMan.phone = phone
            blissMan.sex = (sex*1) ||0  //1男 2女 0未知
            blissMan.birthday = dateDictionary(birthday)
            blissMan.address = document.getElementById('addrPicker').getElementsByClassName('am-list-extra')[0].innerHTML.replace(/,/g,'')
            blissMan.thing = thing
            blissMan.pid = id
        if(!blissMan.name){
            return showToast('请输入姓名')
        }else if(!blissMan.phone){
            return showToast('请输入电话')
        }else if(!blissMan.sex){
            return showToast('请选择性别')
        }
        Toast.loading('升疏生成中...',0)
        this.props.createBlissMan({blissMan},(src)=>{
            this.setState({src})
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
            webchatPay({prayId:order.id,sum:order.sum,tid:order.tid})
        }else{
            this.props.history.push('/temple')
        }
    }

    render(){
        const { order, show, followFlag, messageModal2, messageModal, birthday, address, src, burning} = this.state
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
                                    <div className='lh-26'>
                                        <div className='textIndent2 pb-20 '>
                                            {order.unick}在{order.tname} {order.fname}供奉了{order.content?order.content:"佛灯"}共{order.dengwei.length}盏。
                                        </div>    
                                        <div className={`${order.blessing?'':'hidden'}`}>
                                            <div className='pt-10'>祈愿文：</div>
                                            <div className='textIndent2 pb-20'>{order.blessing}</div>
                                        </div>
                                    </div>
                                }

                            </div>
                            <div className='inf'>
                                <div className='leftBlock c-erji'>
                                    <p className={show?'':'text-overflow2'} onClick={()=>this.setState({show:!show})}>
                                        供灯位置：{order.dengwei.map(v=>
                                        positionMesArray(v.side,v.row,v.col,v.maxrow,"mode1")).map(val=>val[0]).join("、")}</p>
                                    <p>供灯时长：{during}</p>
                                    <p>创建时间：{timeFormat(order.createTime).toLocaleString()}</p>
                                </div>
                                <div className='rightBlock'>
                                    <img width='100%' src={require('./qrcode.jpg')} alt=""/>
                                </div>
                            </div>   
                            <div className={`follow ${followFlag?'hidden':''}`}>
                                <img className='arrow pos-a' width="15px" src={require('./arrow.png')} alt='' />
                                <div className='f-16 c-red'>长按图片 识别二维码关注公众号</div>
                            </div>                    
                        </div>  
                    </div>
                    <WhiteSpace/>
                    <Button type="warning" className="orangeBtn"
                        onClick={()=>this.handleClickReback()}
                    >{order.payStatus!==2?order.payStatus!==3?'去支付':'重新下单':'返回'}</Button>
                </WingBlank>
                <WhiteSpace/>


                <Popup messageModal={messageModal2} shutdown={this.onClose('messageModal2')}>
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
                
                <Popup messageModal={messageModal} shutdown={this.onClose('messageModal')}>
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
                            <DatePicker mode="date" title="生日" extra="福佑联系人生日" value={birthday} 
                                minDate={new Date(1900,1,1)} maxDate={new Date()} onChange={birthday => this.setState({ birthday })}
                                >
                                <List.Item arrow="horizontal">生日：</List.Item>
                            </DatePicker>
                            <Picker extra="所在地区" cols={2}
                                data={District}
                                title="地址选择"
                                value={address}
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

                <div className={`dbssBlock ${src===''?'hidden':'showin'} ${burning?'burnings':''}`}>
                    <img src={src} alt=""/> 
                    <div className={`burnBtn  ${burning?'bg-grey1':'orangeBg'}`} onClick={()=>this.handleBurning()}>点击开始焚化</div>
                    <div className={`burnBlock ${burning?'burning':''}`}></div>
                </div>
                
            </div>
        )
    }
}

export default PrayDetail;