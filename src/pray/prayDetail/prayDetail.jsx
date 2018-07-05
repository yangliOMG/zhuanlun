import React from 'react'
import { WhiteSpace ,WingBlank, List ,InputItem,TextareaItem,DatePicker,Picker,Modal, Toast, Button } from 'antd-mobile'
import {connect} from 'react-redux'
import District from './area'
import {duringDictionary, dateDictionary, showToast, directionDictionary, cengConvert } from '../../util'
import Popup from '../../component/userMesTable/userMesTable.jsx'

import Order from '../../service/order-service.jsx'
import './prayDetail.less'

const _order = new Order()
@connect(
    state=>state.prayList,
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
        if(order.blissStatus===2){
            const content = '上表升疏是向神佛陈情之章奏，需严肃慎重。凡升疏（表）者，需在疏（表）文中明确自己的住址、姓名、生辰及所求之事。代'+
                '别人升表者，可以写当事人名，也可以写委托人名'
            const style = {background: 'linear-gradient(to right bottom,#ffa800,#ff6300)',color: 'white',borderRadius:'27px',height: '34px',lineHeight: '34px'}
            Modal.alert('填写完整信息，获得升疏(表)', content, [
                { text: '取消', onPress: () => {},style:{...style,background:'#999'} },
                { text: '确认', onPress: () => this.handleInput('messageModal',true),style:{...style,marginLeft:'10px'} },
            ],'android')
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
        Toast.loading('生成中...',0)
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
        }, 8000);
    }

    render(){
        //computed
        const during = duringDictionary().find(v=>v.type===this.state.order.duration).name
        return (
            <div>
                <WhiteSpace/>
                <WingBlank size="lg">
                    <div className='prayDetail'>
                        <img width='100%' src={require(this.state.order.payStatus===2?'./fohou.png':'./fohou1.png')} alt=""/>
                        <div className='prayText'>
                            <div className='c-black1 art'>
                                {this.state.order.payStatus===2?
                                    <div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {this.state.order.unick}在{this.state.order.tname} {this.state.order.fname}点亮了{this.state.order.dengwei.length}盏佛灯</div>    
                                    <div className={`${this.state.order.blessing?'':'hidden'}`}>祝愿：{this.state.order.blessing}</div></div>
                                        :
                                    <div className='notpay'>未支付</div>
                                }

                            </div>
                            <div className='inf'>
                                <div className='leftBlock c-erji'>
                                    <p>供灯位置：{this.state.order.dengwei.map(val=>
                                        `${directionDictionary(val.side-1)}面${cengConvert(val.row-1,15)}层${(Number(val.col)+"").padStart(2,0)}位、`)}</p>
                                    <p>供灯时长：{during}</p>
                                    <p>创建时间：{new Date(this.state.order.createTime).toLocaleString()}</p>
                                </div>
                                <div className='rightBlock'>
                                    <img width='100%' src={require('./qrcode.jpg')} alt=""/>
                                </div>
                            </div>                       
                        </div>  
                    </div>
                    <WhiteSpace/>
                    <Button type="warning" className="orangeBtn"
                        onClick={()=>this.props.history.push('/myPraylist')}
                    >返回</Button>
                </WingBlank>
                <WhiteSpace/>



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
                            <Picker extra="所在地区"
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
                            <div style={{flex:'1 1'}}><div className='bg-grey1 anniu' onClick={this.onClose('messageModal')}>取消</div></div>
                            <div style={{flex:'1 1'}}><div className='orangeBg anniu' onClick={()=>this.handleSubMes()}>确认</div></div>
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