import React from 'react'
import { WhiteSpace, Card, WingBlank } from 'antd-mobile'
import {connect} from 'react-redux'

import {timeLongCount,duringDictionary,ArraySum } from '../../util'
import Order from '../../service/order-service.jsx'
import {savePrayList} from '../../redux/pray.redux'
import  "./myPraylist.less"
const _order = new Order()
@connect(
    state=>state.prayList,
    {savePrayList}
)
class MyPraylist extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            praylist : this.props.prayList
        }
    }

    componentDidMount(){
        if(this.props.prayList.length===0){
            _order.getOrderList().then(res=>{
                if(res.status === 200){
                    this.setState({praylist : res.data})
                    this.props.savePrayList(res.data)
                }
            })
        }
    }

    render(){
        return (
            <div>
                <WhiteSpace/>
                <WingBlank size="lg">
                    {this.state.praylist.map((v,idx)=>
                        <div key={v.id}>
                            <Card full className='radius prayLi' onClick={()=>this.props.history.push(`/prayDetail#${v.id}`)}>
                                <div className='prayHead orangeBg'>{v.blessing}</div>
                                <Card.Body>
                                    <div className='prayTitle'>
                                        <div className='imgBlock'><img src={v.tico} alt="" style={{width:'100%'}} /></div>
                                        <div className='titBlock'>
                                            <div style={{paddingBottom:'5px'}}>{v.tname} {v.fname}</div>
                                            {v.dengwei.map((val,idx2)=>
                                                <div key={idx2} className='spand'>
                                                    <span className='lampIcon l-shan tini'></span>{val.side}面{val.row}行{val.col}列
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>供灯时长：{duringDictionary().find(x=>x.type===v.duration).name}</div>
                                    <div>供灯周期：{new Date(v.createTime).toLocaleString()}-{new Date(v.closeTime).toLocaleString()}</div>
                                    <div>已供时间：{timeLongCount(v.createTime,v.closeTime)}</div>
                                    <div>供灯金额：{(ArraySum(v.dengwei.map(x=>x.money))/100).toFixed(2) }元</div>
                                </Card.Body>
                                <Card.Footer content="" extra={<div>查看详情 > </div>} />
                            </Card>
                            <WhiteSpace/>
                        </div>
                    )}
                </WingBlank>
            </div>
        )
    }
}

export default MyPraylist;