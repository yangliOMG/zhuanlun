import React from 'react'
import { WhiteSpace, Card,  NoticeBar } from 'antd-mobile'
import {connect} from 'react-redux'
// import  "./myPhone.css"

@connect(
    state=>state.user,
)
class MyPhone extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return (
            <div>
                {this.state.praylist.map((v,idx)=>
                    <div key={v.id} onClick={()=>this.props.history.push(`/prayDetail#${v.id}`)}>
                        <NoticeBar marqueeProps={{ loop: true }}>
                            {v.template}
                        </NoticeBar>
                        <Card full>
                            <Card.Body>
                                <div style={{display:'flex'}}>
                                    <div style={{flex:'1 1'}}><img src={v.img} alt="" style={{width:'100%'}} /></div>
                                    <div style={{flex:'2 1',padding:'0 5px',lineHeight:'30px'}}>
                                        <div style={{textAlign:'center'}}>{v.temple}</div>
                                        {v.position.map((pos,idx2)=>
                                            <div key={idx2} style={{fontSize:'14px',color:'#aaa',display:'inline-block',marginRight:'10px'}}>{pos[1]}</div>
                                        )}
                                    </div>
                                </div>
                                <div>供灯时长：{v.time}</div>
                                <div>供灯周期：2018年5月1日 8点18分-2018年6月1日</div>
                                <div>已供时间：1天3小时45分12秒</div>
                                <div>供灯金额：{(v.total/100).toFixed(2)}元</div>
                            </Card.Body>
                            <Card.Footer content="" extra={<div>查看详情 > </div>} />
                        </Card>
                        <WhiteSpace/>   
                    </div>
                )}
            </div>
        )
    }
}

export default MyPhone;