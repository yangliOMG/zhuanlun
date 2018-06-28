import React from 'react'
import { WhiteSpace ,WingBlank, List ,Button,InputItem,TextareaItem,DatePicker,Picker } from 'antd-mobile'
import {connect} from 'react-redux'
import { district, provinceLite } from 'antd-mobile-demo-data'
import dis from './area'
import { cvux  } from 'city-data'
import {duringDictionary } from '../../util'
import Popup from '../../component/userMesTable/userMesTable.jsx'

import Order from '../../service/order-service.jsx'
import './prayDetail.less'

const _order = new Order()
console.log(district)
console.log(provinceLite)
console.log(dis)
console.log(cvux)
@connect(
    state=>state.user,
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
                adds:[["033","xxxx"],["023","xxxx"]],
                tname:'灵隐寺',
                fname:'测试一号',
                createtime:'2018-06-19 13:45:33',
            },
            obj : {
                img: 'http://img.mp.sohu.com/upload/20170510/c8503d3f105d43baa3c8db15a08deb7c_th.png',
                id:'qwer',
            },
            messageModal: false,
            name:'',
            tel:'',
            sex:'',
            birthday:'',
            addr:'',
            blessing:'',
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
    componentDidMount(){
        // const content = '上表升疏是向神佛陈情之章奏，需严肃慎重。凡升疏（表）者，需在疏（表）文中明确自己的住址、姓名、生辰及所求之事。代'+
        //     '别人升表者，可以写当事人名，也可以写委托人名'
        // const style = {background: 'linear-gradient(to right bottom,#ffa800,#ff6300)',color: 'white',borderRadius:'27px',height: '34px',lineHeight: '34px'}
        // Modal.alert('填写完整信息，获得升疏(表)', content, [
        //     { text: '取消', onPress: () => {},style:{...style,background:'#999'} },
        //     { text: '确认', onPress: () => console.log('ok'),style:{...style,marginLeft:'10px'} },
        // ],'android')
    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({[key]: true});
    }
    onClose = key => () => {
        this.setState({[key]: false});
    }
    handleInput(key,value){
        this.setState({[key]: value});
    }

    render(){
        //computed
        const during = duringDictionary().find(v=>v.type===this.state.order.duration).name
        return (
            <div>
                <WhiteSpace/>
                <WingBlank size="lg">
                    <div className='prayDetail'>
                        <img width='100%' src={this.state.obj.img} alt=""/>
                        <div className='prayText'>
                            <div className='c-black1 art'>
                                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {this.state.order.unick}在{this.state.order.tname} {this.state.order.fname}点亮了{this.state.order.num}盏佛灯</div>    
                                <div>祝愿：{this.state.order.blessing}</div>    
                            </div>
                            <div className='inf'>
                                <div className='leftBlock c-erji'>
                                    <p>供灯位置：{this.state.order.adds.map((v)=>v[0]+v[1]+" ")}</p>
                                    <p>供灯时长：{during}</p>
                                    <p>创建时间：{this.state.order.createtime}</p>
                                </div>
                                <div className='rightBlock'>
                                    <img width='100%' src={require('./qrcode.jpg')} alt=""/>
                                </div>
                            </div>                       
                        </div>  
                    </div>
                </WingBlank>
                <WhiteSpace/>
                <Button onClick={this.showModal('messageModal')}>basic</Button>


            {/* name:'',
            tel:'',
            sex:'',
            birthday:'',
            addr:'',
            blessing:'' */}
                <Popup messageModal={this.state.messageModal} shutdown={this.onClose('messageModal')}>
                    <div className='messageModal'>
                        <List>
                            <InputItem placeholder="福佑联系人姓名"
                                onChange={v=>this.handleInput('name',v)}
                            >姓名：</InputItem>
                            <InputItem placeholder="福佑联系人电话"
                                onChange={v=>this.handleInput('tel',v)}
                            >电话：</InputItem>
                            <List.Item
                            >性别：
                                <label htmlFor="male" className='radioBlock'>
                                    <input type="radio" name="radio" value="男" id="male" onChange={v=>this.handleInput('sex','男')}/>男
                                </label>
                                <label htmlFor="female" className='radioBlock'>
                                    <input type="radio" name="radio" value="女" id="female" onChange={v=>this.handleInput('sex','女')}/>女
                                </label>
                            </List.Item>
                            <DatePicker mode="date" title="生日" extra="福佑联系人生日" value={this.state.birthday} minDate={new Date(1900,1,1)}
                                onChange={birthday => this.setState({ birthday })}
                                >
                                <List.Item arrow="horizontal">生日：</List.Item>
                            </DatePicker>
                            <List.Item arrow="horizontal" onClick={(e) => console.log(e)}
                            >地址：<span className='c-bbb'>{this.state.addr||'所在地区'}</span></List.Item>
                            <Picker extra="请选择(可选)"
                                data={cvux}
                                title="Areas"
                                // {...getFieldProps('district', {
                                //     initialValue: ['340000', '341500', '341502'],
                                // })}
                                onOk={e => console.log('ok', e)}
                                onDismiss={e => console.log('dismiss', e)}
                                >
                                <List.Item arrow="horizontal">地址</List.Item>
                            </Picker>
                            <TextareaItem className="textarea" title="祈愿："
                                onChange={v=>this.handleInput('blessing',v)}
                                rows={3} autoHeight placeholder={'请输入所求之事'}
                                >
                            </TextareaItem>
                        </List>
                    </div>
                </Popup>
                
            </div>
        )
    }
}

export default PrayDetail;