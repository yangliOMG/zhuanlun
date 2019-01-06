import React from 'react'
import { List, WhiteSpace  , Stepper, TextareaItem, Modal, WingBlank, InputItem, Grid,  } from 'antd-mobile'
import {connect} from 'react-redux'
import FontAwesome from 'react-fontawesome';

import PrayNavbar from '../../component/prayNavbar/hoc.jsx'
import LampDetail from '../../pray/lampDetail/lampDetail.jsx'

import { TO_GET_TOWERMES, TO_GET_TEMPLATE,TO_GET_TEXTSCAN,TO_PUT_ORDER,TO_GET_ORDER,TO_GET_RANDOMPOSITION,
     UPDATEORDER } from '../../constant/actionType'
import {showToast,duringDictionary,getStorage,getQueryString } from '../../util'
import {webchatPay } from './wechatPay.js'

import './prayForm.css'
import './prayForm.less'

@connect( state=>state ,
    dispatch => ({
        getTowerMessage: (payload, callback, callback2) => dispatch({type: TO_GET_TOWERMES, payload, callback, callback2}),
        getTemplate: (payload, callback, callback2) => dispatch({type: TO_GET_TEMPLATE, payload,callback,callback2}),
        getRandomPosition: (payload, callback) => dispatch({type: TO_GET_RANDOMPOSITION, payload,callback}),
        getOrderByid: (payload, callback) => dispatch({type: TO_GET_ORDER, payload,callback }),
        updateOrder: (payload) => dispatch({type: UPDATEORDER,payload}),
        getTextScan: (payload, callback, callback2) => dispatch({type: TO_GET_TEXTSCAN, payload,callback,callback2}),
        createOrder: (payload, callback, callback2) => dispatch({type: TO_PUT_ORDER, payload,callback,callback2}),
    })
)
class PrayForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            obj :{},
            price:{ 1:1200, 30:19900, 365:120000, 7200:600000 },
            unick:getStorage('user').nick,

            typeList:[],
            navList:[],
            checkBoxFlag:false,
            textScan:true,
            modal2: false,
            infoVisible: false,
            positionChangable:true
        }
    }
    ajaxGetRandomPosition(num){
        // let id = this.props.location.hash.replace("#","").replace(/[^0-9a-zA-Z]/g,'')
        // this.props.getRandomPosition({id,num},(mes)=>{
        //     console.log(mes)
        // })
    }

    componentWillMount(){
        let id = this.props.location.hash.replace("#","").replace(/[^0-9a-zA-Z]/g,'')
        let pid = getQueryString("pid")
        const { position,num } = this.props.order
        if(pid){
            this.props.getOrderByid({id:pid},(obj,price)=>{
                this.setState({
                    obj, price, positionChangable:false
                })
            },(mes)=>{
                showToast('没有该订单信息')
                console.log(mes)
            })
        }else if(id){
            this.props.getTowerMessage( {fid:id}, (obj,price,typeList,navList)=>{
                this.setState({
                    obj,price,typeList,navList
                })
                this.handleTemplateType(typeList[0].id)
            },(mes)=>{
                showToast(mes)
            })
            if(position.length<=0){
                this.ajaxGetRandomPosition(num)
            }
        }
    }
    // componentDidMount(){
    //     document.getElementById('stepper').getElementsByClassName('am-stepper-input')[0].setAttribute('disabled',true)
    // }
    
    handleTemplateType(type){
        this.props.getTemplate({type},()=>{
            this.handleBlurTextScan()
        },()=>
            showToast('暂无该类模板')
        )
    }
    handleCheckbox(){
        let {typeList, checkBoxFlag,} = this.state
        let { num} = this.props.order
        let len = 1
        if(checkBoxFlag){
            len = typeList.filter(v=>v.flag===true).length
            if(len>=2){
                let idx = typeList.findIndex(v=>v.flag===true)
                typeList = typeList.map((v,i)=>({...v, flag:i===idx?true:false}))
            }else if(len===0){
                typeList = typeList.map((v,i)=>({...v, flag:i===0?true:false}))
            }
        }
        this.setState({
            checkBoxFlag: !checkBoxFlag,
            typeList,
        })
        this.props.updateOrder({num: Math.ceil(num/len)})
    }
    handleGrid(e){
        let { typeList, checkBoxFlag, } = this.state
        let { num, position } = this.props.order
        if(!checkBoxFlag){
            typeList = typeList.map(v=>({...v, flag:e.id===v.id?true:false}))
        }else{
            let li = typeList.filter(v=>v.flag===true)
            if(li.length===1&&li[0].id===e.id){
            }else{
                num = Math.ceil(e.flag? num-num/li.length :num+num/li.length)
                typeList = typeList.map(v=>({...v, flag:e.id===v.id?(!v.flag):v.flag}))
            }
        }
        let chosen = typeList.filter(v=>v.flag===true), value = {num}
        if( num < position.length){
            position = position.slice(0,num)
            value = {...value, position}
        }else if(num > position.length){
            this.ajaxGetRandomPosition(num)
        }
        this.setState({ typeList})
        this.props.updateOrder(value)
        this.handleTemplateType(chosen.length===1?chosen[0].id:'0')
    }
    handleNumChange(num){
        let { typeList} = this.state
        let { position } = this.props.order
        let checked = typeList.filter(v=>v.flag===true)
        if(num<checked.length){
            return true
        }

        let  value = {num}
        if( num < position.length){
            position = position.slice(0,num)
            value = {...value, position}
        }else if(num > position.length){
            this.ajaxGetRandomPosition(num)
        }
        this.props.updateOrder(value)
    }
    handleTimeBtnClick(duration){
        this.props.updateOrder({duration})
        if(duration===7300){
            this.handleNumChange(1)
        }
    }
    handleInput(unick){
        this.setState({unick})
    }
    handleTextarea(blessing){
        this.props.updateOrder({blessing})
    }
    handleBlurTextScan(){
        let { blessing } = this.props.order
        blessing = blessing.replace(/{{prayer}}/g,this.state.unick||'')
        if(blessing!==''&&false){
            this.props.getTextScan({blessing},()=>{
                this.setState({textScan:true})
            },(mes)=>{
                this.setState({textScan:false})
                showToast(mes,3)
            })
        }else{
            this.setState({textScan:true})
        }
    }
    handlePay(){
        let order = {...this.props.order}
        let { unick, typeList} = this.state
        let contentType = typeList.filter(v=>v.flag)
        order.blessing = order.blessing.replace(/{{prayer}}/g,unick||'')
        order.prayman = unick
        order.openTime = (new Date()).getTime()
        order.type = 1
        order.adds = order.position.map(i=>i[0])
        order.fid = this.props.location.hash.replace("#","")
        order.source = getQueryString('src')===1? 1:2       //src = 1 入口，src = 2扫码
        order.content = contentType.length===1?contentType[0].name:contentType.map(v=>v.name).join("、")
        if((order.num !== order.position.length)||(order.adds.length<=0)){
            return showToast('请完善供灯位置')
        }
        if(contentType.length>order.num){
            return showToast('祈福类型不能多于供灯数量',2)
        }
        if(order.duration===""){
            return showToast('请选择时长')
        }
        // if(this.state.textScan===false){
        //     return showToast('祈愿文内容违规')
        // }
        delete order.position
        if(order.blessing&&false){
            this.props.getTextScan({blessing:order.blessing},()=>{
                this.createOrder(order)
            },(mes)=>{
                this.setState({textScan:false})
                showToast(mes,3)
            })
        }else{
            this.createOrder(order)
        }
    }
    createOrder(order){
        this.props.createOrder({order},(res)=>{
            webchatPay(res)
        },(mes)=>{
            showToast(mes)
        })
    }

    showModal(key,e){
        e.preventDefault(); // 修复 Android 上点击穿透
        if(this.state.positionChangable){
            this.setState({[key]: true})
            document.getElementById('root').style.overflow ='hidden'// 修复 ios 上滚动穿透
        }else{
            showToast("续灯不可改变位置")
        }
    }
    onClose = key => (value) => {
        this.setState({[key]: false,...value})
        document.getElementById('root').style.overflow =''
    }
      

    render(){
        const { obj, price, unick, typeList, navList, checkBoxFlag, infoVisible, positionChangable, modal2 } = this.state
        const { duration, num, blessing, position } = this.props.order
        //module
        const Item = List.Item
        const Brief = Item.Brief
        //computed
        const contentType = typeList.filter(v=>v.flag)
        const contentTime = duringDictionary().find(v=>v.type+''===duration)
        const btnList = Object.keys(price).map(val=>
                            duringDictionary().find(v=>v.type+''===val)
                        ).filter(v=>v)
        const total = (price[duration]||0)* num
        const prayArticle = blessing.replace(/{{prayer}}/g,unick||'')

        return (
            <div>
                <PrayNavbar navList={navList} />
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <div className='temCard radius'>
                        <div className='img'>   
                            <img className='ico' src={obj.ico} alt="" />
                        </div>
                        <div className='ti' onClick={()=>this.setState({infoVisible:!infoVisible})}>
                            <div className='title'>{obj.tname}{obj.name}</div>
                            <div className='info text-overflow4a'>{obj.info}</div>
                        </div>
                        <div className={`info absBlock radius ${infoVisible?'':'hidden'}`}
                            onClick={()=>this.setState({infoVisible:false})}>
                            {obj.info}
                            <span className='arrow_wrp'>
                                <i className='editor_arrow out'></i>
                                <i className='editor_arrow in'></i>
                            </span>
                        </div>
                    </div>
                    <WhiteSpace size="sm" />
                    <div className='radius ofhd'>
                        <List>
                            <InputItem placeholder="输入名字"
                                value={unick}
                                onChange={v=>this.handleInput(v)}
                            >祈愿人：</InputItem>
                            { typeList.length>0&&positionChangable ?<Item className='gridRow'>
                                <div className='gridTitle'>
                                    <div className='tit'>祈福类型：</div>
                                    <div className={`exp ${checkBoxFlag?'c-red':'c-fuzhu'}`}>
                                        <label onClick={ ()=>this.handleCheckbox()}>
                                            <FontAwesome name={checkBoxFlag?'check-square':'square-o'}  size='lg' />
                                            <div className='word'>多选</div>
                                        </label>
                                    </div>
                                </div>
                                <Grid data={typeList} hasLine={false} columnNum={4} activeStyle={false}
                                    onClick={ v=>this.handleGrid(v) } itemStyle={{height:"40px"}}
                                    renderItem={v => (
                                        <div >
                                            <div className={`gridItem gridBord ${v.flag?"gridBg":""}`}>
                                                <div className={`gridText gridCol ${v.flag?"active":""}`}>
                                                    <span>{v.name}</span>
                                                </div>
                                                <img src={require('./cloud.png')} className='gridIco' style={{display: v.flag?'':'none'}} alt="" /> 
                                            </div>
                                            
                                        </div>
                                    )} 
                                />
                                <div className='descri'>供奉{contentType.length===1?contentType[0].name:contentType.map(v=>v.name).join('、')}共
                                    {num}盏{(contentTime||"").name}</div>
                            </Item>:null}
                            <TextareaItem className="textarea" title="祈愿文："
                                onChange={v=>this.handleTextarea(v)}
                                onBlur={()=>this.handleBlurTextScan()}
                                rows={3} count={30} autoHeight placeholder={'请输入'}
                                value={prayArticle}
                                >
                            </TextareaItem>
                            <Item  className="def-listitem1" id='stepper'
                                extra={<Stepper style={{ width: '100%', minWidth: '100px' }}
                                                showNumber max={100} min={1}
                                                value={num}
                                                disabled={!positionChangable}
                                                onChange={(v) =>this.handleNumChange(v)}
                                        />}
                            >供灯数量</Item>
                            <Item multipleLine >供灯时长
                                <Brief >
                                    <div className="timelongArea">
                                        {btnList.map((v,idx)=> v.type!==7300?
                                            <div key={v.type} className="btnBlock">
                                                <div className={`timeBtn ${duration===v.type?'oran':'oran-o'}`}
                                                    onClick={()=>this.handleTimeBtnClick(v.type)}>
                                                    <p>{v.name}</p><p>({(price[v.type]/100)}元)</p></div>
                                            </div>:null
                                        )}
                                    </div>
                                    {btnList.map((v,idx)=> v.type===7300?
                                        <div key={v.type} className="btnBlock">
                                            <div className={`timeBtn ${duration===v.type?'oran':'oran-o'}`}
                                                onClick={()=>this.handleTimeBtnClick(v.type)}>
                                                <p>{v.name}</p><p>({(price[v.type]/100)}元)</p></div>
                                        </div>:null
                                    )}
                                </Brief>
                            </Item>
                            <Item arrow="horizontal" className="def-listitem"
                                extra={position.map((v,idx)=>position.length===idx+1?v[1][1]:v[1][1]+',')}
                                onClick={(e) => this.showModal('modal2', e)}
                            >供灯位置</Item>
                        </List>
                        
                    </div>
                </WingBlank>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                
                <div className='stick-footer'>  
                    <div className="total">供灯功德：<span className='c-red'>￥{(total/100).toFixed(2)}</span></div>
                    <a className="payBtn" onClick={()=>{this.handlePay()}}>确认祈福</a>
                </div>


                <Modal visible={modal2}
                    transitionName ='slide-right'
                    maskTransitionName  ='slide-right'
                    >
                    <LampDetail onClose={this.onClose('modal2')} />
                </Modal>
            </div>
        )
    }
}

export default PrayForm;