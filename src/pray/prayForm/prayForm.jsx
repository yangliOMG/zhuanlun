import React from 'react'
import { List, Button, WhiteSpace  , Stepper, TextareaItem} from 'antd-mobile'
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'

// import {update} from '../../redux/user.redux'
import PrayNavbar from '../../component/prayNavbar/prayNavbar.jsx'
import './prayForm.css'

@connect(
    state=>state,
    // {update}
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
            num: 2,
            price:{
                day:9.8,
                month:19.8,
                year:199,
                all:3600
            },
            chooseBtn:'',
            total:0,
            template:this.props.order.template
        }
    }

    handleChange(num){
        this.setState({
            num,
            total: ((this.state.price[this.state.chooseBtn]||0)* num).toFixed(2)
        })
    }
    handleClick(time){
        if(time===this.state.chooseBtn)
            return
        this.setState({
            chooseBtn:time,
            total: (this.state.price[time] * this.state.num).toFixed(2)
        }) 
    }
    handleTextarea(template){
        this.setState({
            template
        })
    }
    handlePay(e){
        // e.target.className += " payBtn-active"
    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
          [key]: true,
        });
      }
      onClose = key => () => {
        this.setState({
          [key]: false,
        });
      }
    render(){
        const obj = this.state.obj
        const chos = this.state.chooseBtn
        const Item = List.Item
        const Brief = Item.Brief
        const btnList = [{type:'day',name:'1天'},{type:'month',name:'1月'},{type:'year',name:'1年'},{type:'all',name:'长期'}]
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
                                        onChange={(v) =>this.handleChange(v)}
                                />}
                    >供灯数量</Item>
                    <Item multipleLine
                    >供灯时长
                        <Brief>
                            {btnList.map((v,idx)=>
                                <Button className="radiobutton" size="small" inline key={v.type}
                                    type={chos===v.type?'primary':'ghost'}
                                    onClick={()=>this.handleClick(v.type)}>{v.name}</Button>
                            )}
                        </Brief>
                    </Item>
                </List>
                <List>
                    <Item 
                        arrow="horizontal"
                        onClick={() => this.props.history.push(`/lampDetail`)}
                    >供灯位置</Item>
                </List>
                <List>
                    <Item 
                        arrow="horizontal"
                        extra={'使用模板'}
                        onClick={() => this.props.history.push(`/template`)}
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
                    <div style={{flex: '1 1',background:'orange' }} >供灯金额：￥{this.state.total}</div>
                    <a className="payBtn" style={{flex: '1 1' }} onClick={(e)=>{this.handlePay(e)}}>确认祈福</a>
                </div>

            </div>
        )
    }
}

export default PrayForm;