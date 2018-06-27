import React from 'react'
import { List, WhiteSpace  , Stepper, TextareaItem, Modal, WingBlank, InputItem,Popover} from 'antd-mobile'
import {connect} from 'react-redux'

// import {update} from '../../redux/user.redux'
import PrayNavbar from '../../component/prayNavbar/prayNavbar.jsx'
import LampDetail from '../../pray/lampDetail/lampDetail.jsx'
import Template from '../../pray/template/template.jsx'

import {updateOrder} from '../../redux/order.redux'
// import Order from '../../service/order-service.jsx'
import {showToast } from '../../util'
import {webchatPay } from './wechatPay.js'
import Tem from '../../service/temple-service.jsx'


import './prayForm.css'
import './prayForm.less'
const _temple = new Tem()
const defaultTowImg = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526464293949&di=1cf8a781791ec773f4faaff41ccb3dc8&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F2fdda3cc7cd98d10015049ac2b3fb80e7aec90a2.jpg'

@connect(
    state=>state,
    {updateOrder}
)
class PrayForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            obj :{},
            num: this.props.order.num,
            price:{
                1:980,
                30:1980,
                365:19900,
                [-1]:360000
            },
            duration:this.props.order.duration,
            total:0,
            blessing:this.props.order.blessing,
            position:this.props.order.position,
            modal2: false,
            modal1: false,

            visible: false,
        }
    }
    componentWillMount(){
        const id = this.props.location.hash.replace("#","")
        if(id){
            _temple.getTowerById(id).then(res=>{
                if(res.status === 200){
                    this.setState({
                        obj: res.data,
                    })
                }
            })
        }
    }
    // componentDidMount(){
    //     let _this = this
    //     window.addEventListener("popstate", (e)=>{  //监听回退按钮
    //         console.log(_this)
    //         _this.setState({
    //             modal2: false
    //         });
    //     }, false); 
    // }

    handleNumChange(num){
        let position = this.state.position
        if( num < position.length){
            position = position.slice(0,num)
        }
        this.setState({num,position,})
        this.props.updateOrder({num,position})
    }
    handleTimeBtnClick(duration){
        this.setState({duration}) 
        this.props.updateOrder({duration})
    }
    handleTextarea(blessing){
        this.setState({blessing})
        this.props.updateOrder({blessing})
    }
    handlePay(){
        let order = {...this.props.order}
        // order.total = (this.state.price[this.state.duration]||0)* this.state.num
        order.openTime = (new Date()).getTime()
        order.type = 1
        order.adds = order.position.map(i=>i[0])
        order.fid = this.props.location.hash.replace("#","")
        if(order.num !== order.position.length){
            return showToast('请完善供灯位置')
        }
        if(order.duration===""){
            return showToast('请选择时长')
        }
        delete order.position
        webchatPay(order)
    }

    showModal(key,e){
        // window.history.pushState({title: "title",url: "#detail"}, "title", "#detail");
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => (value) => {
        this.props.history.goBack()
        this.setState({
            [key]: false,
            ...value
        });
    }

    handleVisibleChange = (visible) => {
        this.setState({
          visible,
        })
    }


    render(){
        const obj = this.state.obj
        const chos = this.state.duration
        const Item = List.Item
        const Brief = Item.Brief
        const btnList = [{type:1,name:'1天'},{type:30,name:'1月'},{type:365,name:'1年'},{type:-1,name:'长明'}]
        const total = (this.state.price[this.state.duration]||0)* this.state.num
        return (
            <div>
                <PrayNavbar />
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <div className='temCard radius'>
                        <div className='img'>   
                            <img className='ico' src={obj.ico||defaultTowImg} alt="" />
                        </div>
                        <div className='ti'>
                            <div className='title'>{obj.tname}{obj.name}</div>
                            <div className='info'>{obj.info}</div>
                        </div>
                    </div>
                    <WhiteSpace size="sm" />
                    <div className='radius ofhd'>
                        <List>
                            <InputItem placeholder="输入名字"
                            >祈愿人：</InputItem>
                            {/* <Item 
                                arrow="horizontal"
                                extra={'使用模板'}
                                onClick={(e) => this.showModal('modal1', e)}
                            >祈愿文：</Item> */}
                            <div className="pos-r">
                                <TextareaItem className="textarea"
                                    title="祈愿文："
                                    onChange={v=>this.handleTextarea(v)}
                                    rows={3}
                                    autoHeight
                                    placeholder={'请输入'}
                                    value={this.state.blessing}
                                    >
                                </TextareaItem>
                                <Popover mask
                                    overlayClassName="fortest"
                                    visible={this.state.visible}
                                    overlay={[
                                        (<Item><span className="modeBtn" onClick={()=>this.setState({visible:false})}>健康</span>
                                        <span className="modeBtn" onClick={()=>this.setState({visible:false})}>长寿</span>
                                            <span className="modeBtn" onClick={()=>this.setState({visible:false})}>长寿</span>
                                            <span className="modeBtn" onClick={()=>this.setState({visible:false})}>长寿</span></Item>),
                                        (<Item><span className="modeBtn" onClick={()=>this.setState({visible:false})}>平安</span>
                                            <span className="modeBtn" onClick={()=>this.setState({visible:false})}>富贵</span></Item>),
                                    ]}
                                    align={{
                                        overflow: { adjustY: 0, adjustX: 0 },
                                        offset: [-50, 0],
                                    }}
                                    onVisibleChange={(visible)=>this.setState({visible})}
                                >
                                    <div className='moremodule'>更多模板</div>
                                </Popover>
                            </div>
                            <Item  className="def-listitem1"
                                extra={<Stepper style={{ width: '100%', minWidth: '100px' }} 
                                                showNumber max={10} min={1}
                                                value={this.state.num}
                                                onChange={(v) =>this.handleNumChange(v)}
                                        />}
                            >供灯数量</Item>
                            <Item multipleLine
                            >供灯时长
                                <Brief style={{display:'flex'}}>
                                    {btnList.map((v,idx)=>
                                        <div key={v.type} style={{flex:'1 1'}}>
                                            <div className={`timeBtn ${chos===v.type?'oran':'oran-o'}`}
                                                onClick={()=>this.handleTimeBtnClick(v.type)}>
                                                <p>{v.name}</p><p>({(this.state.price[v.type]/100)}元)</p></div>
                                        </div>
                                    )}
                                </Brief>
                            </Item>
                            <Item 
                                arrow="horizontal" className="def-listitem"
                                extra={this.state.position.map((v,idx)=>this.state.position.length===idx+1?v[1][1]:v[1][1]+',')}
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
                    <div className="total">供灯金额：<span className='c-red'>￥{(total/100).toFixed(2)}</span></div>
                    <a className="payBtn" onClick={()=>{this.handlePay()}}>确认祈福</a>
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