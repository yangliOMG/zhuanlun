import React from 'react'
import { List, WhiteSpace  , Stepper, TextareaItem, Modal, WingBlank, InputItem, Grid,  } from 'antd-mobile'
import {connect} from 'react-redux'
import FontAwesome from 'react-fontawesome';

import PrayNavbar from '../../component/prayNavbar/prayNavbar.jsx'
import LampDetail from '../../pray/lampDetail/lampDetail.jsx'
// import Template from '../../pray/template/template.jsx'

import {updateOrder,newOrder} from '../../redux/order.redux'
import {showToast,duringDictionary,getStorage,getQueryString,positionMesArray } from '../../util'
import {webchatPay } from './wechatPay.js'
import Tem from '../../service/temple-service.jsx'
import Order from '../../service/order-service.jsx'


import './prayForm.css'
import './prayForm.less'
const _temple = new Tem()
const _order = new Order()

@connect(
    state=>state,
    {updateOrder,newOrder}
)
class PrayForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            obj :{},
            num: this.props.order.num,
            price:{
                1:1200,
                30:19900,
                365:120000,
                7200:600000
            },
            unick:getStorage('user').nick,
            duration:this.props.order.duration,
            total:0,
            blessing:this.props.order.blessing,
            position:this.props.order.position,

            typeList:[],
            checkBoxFlag:false,
            textScan:true,
            modal2: false,
            visible: false,
            infoVisible: false,
            positionChangable:true
        }
    }
    ajaxGetFacilityMessage(fid){
        _temple.getTowerAndPriceById(fid).then(res=>{
            if(res.status === 200 && res.data.data.facility){
                // let price = {}
                // res.data.data.price.forEach(v=>price[v.duration]=v.price)
                this.setState({
                    obj: res.data.data.facility,
                    // price
                })
            }else{
                showToast('没有该祈福塔信息')
            }
        })
        _temple.getPriceById(fid).then(res=>{
            if(res.status === 200 && res.data.data){
                let price = {}
                res.data.data.forEach(v=>price[v.duration]=v.price)
                this.setState({
                    price
                })
            }
        })
    }
    ajaxGetRandomPosition(num){
        let id = this.props.location.hash.replace("#","").replace(/[^0-9a-zA-Z]/g,'')
        _temple.getRandomPosition(id,num).then(res=>{
            if(res.status === 200 && res.data.data){
                let position = res.data.data.map(v=>([
                    v.address,
                    positionMesArray(v.side,v.row,v.col,v.maxrow,"mode1")
                ]))
                this.setState({ position })
                this.props.updateOrder({position})
            }else{
                console.log('无法随机供灯位置')
            }
        })
    }

    componentWillMount(){
        let id = this.props.location.hash.replace("#","").replace(/[^0-9a-zA-Z]/g,'')
        let pid = getQueryString("pid")
        if(pid){
            _order.getOrderByid(pid).then(res=>{
                if(res.status === 200){
                    let { dengwei,fid } = res.data
                    let position = dengwei.map(v=>([
                        v.address,
                        positionMesArray(v.side,v.row,v.col,v.maxrow,"mode1")
                    ]))
                            
                    this.ajaxGetFacilityMessage(fid)
                    this.setState({
                        position,
                        positionChangable:false
                    })
                }
            })
        }else if(id){
            this.ajaxGetFacilityMessage(id)

            _order.getTemplateType(id).then(res=>{
                let list = res.data.data
                if(res.status === 200 && list.length>0){
                    this.setState({
                        typeList:list.map((v,idx)=>({...v,flag:idx===0?true:false})),
                    })
                    
                    this.handleTemplateType(list[0].id)
                }
            })
            if(this.state.position.length<=0){
                this.ajaxGetRandomPosition(this.state.num)
            }
        }
    }
    // componentDidMount(){
    //     document.getElementById('stepper').getElementsByClassName('am-stepper-input')[0].setAttribute('disabled',true)
    // }
    
    handleTemplateType(type){
        _order.getRandomTemplateByType(type).then(res=>{
            this.setState({visible:false})
            if(res.status === 200&& res.data.content){
                this.handleTextarea(res.data.content)
                this.handleBlurTextScan()
            }else{
                showToast('暂无该类模板')
            }
        })
        
    }
    handleCheckbox(){
        let {typeList, checkBoxFlag, num} = this.state
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
            num: Math.ceil(num/len)
        })
        this.props.updateOrder({num: Math.ceil(num/len)})
    }
    handleGrid(e){
        let {typeList, checkBoxFlag, num, position} = this.state
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
        this.setState({...value ,typeList})
        this.props.updateOrder(value)
        this.handleTemplateType(chosen.length===1?chosen[0].id:'0')
    }
    handleNumChange(num){
        let {position, typeList} = this.state
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
        this.setState(value)
        this.props.updateOrder(value)
    }
    handleTimeBtnClick(duration){
        this.setState({duration}) 
        this.props.updateOrder({duration})
        if(duration===7300){
            this.handleNumChange(1)
        }
    }
    handleInput(unick){
        this.setState({unick})
    }
    handleTextarea(blessing){
        this.setState({blessing})
        this.props.updateOrder({blessing})
    }
    handleBlurTextScan(){
        let blessing = this.state.blessing.replace(/{{prayer}}/g,this.state.unick||'')
        if(blessing!==''&&false){
            _order.getTextScan(blessing).then(res=>{
                if(res.status === 200&& res.data.suggestion==='pass'){
                    this.setState({textScan:true})
                }else{
                    this.setState({textScan:false})
                    if(res.status === 200&& res.data.suggestion==='block'){
                        const dic = {
                            spam:'含垃圾信息',
                            ad:'广告',
                            politics:'涉政',
                            terrorism:'暴恐',
                            abuse:'辱骂',
                            porn:'色情',
                            flood:'灌水',
                            contraband:'违禁',
                            meaningless:'无意义'}
                        showToast('祈愿文内容违规，违规原因：'+dic[res.data.label],3)
                    }
                }
            })
        }else{
            this.setState({textScan:true})
        }
    }
    handlePay(){
        let order = {...this.props.order}
        let { unick, typeList} = this.state
        let contentType = typeList.filter(v=>v.flag)
        // order.total = (this.state.price[this.state.duration]||0)* this.state.num
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
            _order.getTextScan(order.blessing).then(res=>{
                if(res.status === 200&& res.data.suggestion==='pass'){
                    this.createOrder(order)
                }
            })
        }else{
            this.createOrder(order)
        }
    }
    createOrder(order){
        _order.createOrder(order).then(res=>{
            if(res.data.returnCode===1000){
                this.props.newOrder()
                this.setState({position:[]})
                return webchatPay(res.data.data)
            }else{
                let occ = res.data.data.occ
                if(occ){
                    let position = this.state.position.filter(v=>!occ.includes(v[0]))
                    this.setState({position})
                    this.props.updateOrder({position})
                }
                showToast(res.data.data.errorInfo)
            }
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
    // tt(){
    //     let id = this.props.location.hash.replace("#","").replace(/[^0-9a-zA-Z]/g,'')
    //     _temple.getTowerAndPriceById(id).then(res=>{
    //         alert("W"+JSON.stringify(res))
    //     }).catch(e=>alert("W"+JSON.stringify(e))).finally(e=>alert("X"+JSON.stringify(e)))
    // }
    // ss(){
    //     let id = this.props.location.hash.replace("#","").replace(/[^0-9a-zA-Z]/g,'')
    //     _temple.getRandomPosition(id,this.state.num).then(res=>{
    //         alert("W"+JSON.stringify(res))
    //     }).catch(e=>alert("W"+JSON.stringify(e))).finally(e=>alert("X"+JSON.stringify(e)))
    // }

    render(){
        const { obj, price, duration, num, blessing, unick, typeList, checkBoxFlag } = this.state
        //module
        const Item = List.Item
        const Brief = Item.Brief
        //computed
        const contentType = typeList.filter(v=>v.flag)
        const contentTime = duringDictionary().find(v=>v.type+''===duration)
        const btnList = Object.keys(price).map(val=>
                            duringDictionary().find(v=>v.type+''===val)
                        )
        const total = (price[duration]||0)* num
        const prayArticle = blessing.replace(/{{prayer}}/g,unick||'')

        return (
            <div>
                <PrayNavbar />
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <div className='temCard radius'>
                        <div className='img'>   
                            <img className='ico' src={obj.ico} alt="" />
                        </div>
                        <div className='ti' onClick={()=>this.setState({infoVisible:!this.state.infoVisible})}>
                            <div className='title'>{obj.tname}{obj.name}</div>
                            <div className='info text-overflow4a'>{obj.info}</div>
                        </div>
                        <div className={`info absBlock radius ${this.state.infoVisible?'':'hidden'}`}
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
                                value={this.state.unick}
                                onChange={v=>this.handleInput(v)}
                            >祈愿人：</InputItem>
                            { typeList.length>0 ?<Item className='gridRow'>
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
                                                {/* <img src={v.img} className='gridImg' alt="" /> */}
                                                <div className={`gridText gridCol ${v.flag?"active":""}`}>
                                                    <span>{v.name}</span>
                                                </div>
                                                <img src={require('./cloud.png')} className='gridIco' style={{display: v.flag?'':'none'}} alt="" /> 
                                                {/* <Icon className='gridIco' style={{display: checkBoxFlag?'':'none'}}
                                                    type={v.flag?"check-circle":"check-circle-o" } 
                                                    color={v.flag?"red":"#bbb"} 
                                                /> */}
                                            </div>
                                            
                                        </div>
                                    )} 
                                />
                                <div className='descri'>供奉{contentType.length===1?contentType[0].name:contentType.map(v=>v.name).join('、')}共
                                    {this.state.num}盏{(contentTime||"").name}</div>
                            </Item>:null}
                            {/* <div className="pos-r"> */}
                                <TextareaItem className="textarea" title="祈愿文："
                                    onChange={v=>this.handleTextarea(v)}
                                    onBlur={()=>this.handleBlurTextScan()}
                                    rows={3} count={30} autoHeight placeholder={'请输入'}
                                    value={prayArticle}
                                    >
                                </TextareaItem>
                                {/* <Popover mask visible={this.state.visible}
                                    overlay={[
                                        (<Item>
                                            <span className="modeBtn" onClick={()=>this.handleTemplateType('0')}>通用</span>
                                            <span className="modeBtn" onClick={()=>this.handleTemplateType('1')}>平安</span>
                                            <span className="modeBtn" onClick={()=>this.handleTemplateType('2')}>智慧</span>
                                            <span className="modeBtn" onClick={()=>this.handleTemplateType('3')}>事业</span>
                                        </Item>),(<Item>
                                            <span className="modeBtn" onClick={()=>this.handleTemplateType('4')}>健康</span>
                                            <span className="modeBtn" onClick={()=>this.handleTemplateType('5')}>财富</span>
                                            <span className="modeBtn" onClick={()=>this.handleTemplateType('6')}>福寿</span>
                                            <span className="modeBtn" onClick={()=>this.handleTemplateType('7')}>姻缘</span>
                                        </Item>),
                                    ]}
                                    align={{    
                                        points:['br', 'tr'],//https://github.com/yiminghe/dom-align
                                    }}
                                    onVisibleChange={(visible)=>this.setState({visible})}
                                >
                                    <div className='moremodule'>更多模板</div>
                                </Popover> */}
                            {/* </div> */}
                            <Item  className="def-listitem1" id='stepper'
                                extra={<Stepper style={{ width: '100%', minWidth: '100px' }}
                                                showNumber max={100} min={1}
                                                value={this.state.num}
                                                disabled={!this.state.positionChangable}
                                                onChange={(v) =>this.handleNumChange(v)}
                                        />}
                            >供灯数量</Item>
                            <Item multipleLine >供灯时长
                                <Brief >
                                    <div className="timelongArea">
                                        {btnList.map((v,idx)=> v.type!==7300?
                                            <div key={v.type} className="btnBlock">
                                                <div className={`timeBtn ${this.state.duration===v.type?'oran':'oran-o'}`}
                                                    onClick={()=>this.handleTimeBtnClick(v.type)}>
                                                    <p>{v.name}</p><p>({(this.state.price[v.type]/100)}元)</p></div>
                                            </div>:null
                                        )}
                                    </div>
                                    {btnList.map((v,idx)=> v.type===7300?
                                        <div key={v.type} className="btnBlock">
                                            <div className={`timeBtn ${this.state.duration===v.type?'oran':'oran-o'}`}
                                                onClick={()=>this.handleTimeBtnClick(v.type)}>
                                                <p>{v.name}</p><p>({(this.state.price[v.type]/100)}元)</p></div>
                                        </div>:null
                                    )}
                                </Brief>
                            </Item>
                            <Item arrow="horizontal" className="def-listitem"
                                extra={this.state.position.map((v,idx)=>this.state.position.length===idx+1?v[1][1]:v[1][1]+',')}
                                onClick={(e) => this.showModal('modal2', e)}
                            >供灯位置</Item>
                        </List>
                        
                    </div>
                </WingBlank>
                {/* <div className='stick-footer'>  
                    <div className="total" onClick={()=>{this.tt()}}>/facility/info1.do?id=16</div>
                    <a className="payBtn" onClick={()=>{this.ss()}}>/facility/random.do?id=16&num=2</a>
                </div> */}
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                
                <div className='stick-footer'>  
                    <div className="total">供灯功德：<span className='c-red'>￥{(total/100).toFixed(2)}</span></div>
                    <a className="payBtn" onClick={()=>{this.handlePay()}}>确认祈福</a>
                </div>


                <Modal visible={this.state.modal2}
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