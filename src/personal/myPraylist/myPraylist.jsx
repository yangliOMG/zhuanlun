import React from 'react'
import { WhiteSpace, Card,  NoticeBar, NavBar, Icon} from 'antd-mobile'
import {connect} from 'react-redux'


// import {update} from '../../redux/user.redux'
import "./myPraylist.css"

@connect(
    state=>state.user,
    // {update}
)
class MyPraylist extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            praylist : [
                {
                    id:122,
                    num: 2,
                    time:"month",
                    total:390000,
                    template:"身体健康，万事如意",
                    position:[["033","1面4层003位"],["023","1面3层003位"]],

                    temple:'灵隐寺 飞来峰 1号塔',
                    img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526451582347&di=72ff2b8aa694b5d4b92f001c05f487cc&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fy4%2FM02%2FD8%2F9C%2FwKhQiFUJxtiEWWepAAAAAJQnTd4876.jpg',

                },{
                    id:112,
                    num: 1,
                    time:"month",
                    total:190000,
                    template:"身体健康，万事如意222",
                    position:[["033","1面4层003位"],["023","1面3层003位"]],

                    temple:'灵隐寺 飞来峰 1号塔',
                    img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526451582347&di=72ff2b8aa694b5d4b92f001c05f487cc&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fy4%2FM02%2FD8%2F9C%2FwKhQiFUJxtiEWWepAAAAAJQnTd4876.jpg',
                },
            ]
        }
    }

    render(){
        return (
            <div>
                <NavBar 
                    icon={<Icon type="left" />} 
                    mode='dard' 
                    onLeftClick={()=>this.props.history.push('/personalCenter')}
                    >我的祈福</NavBar>
                {this.state.praylist.map((v,idx)=>
                    <div key={v.id} onClick={()=>this.props.history.push(`/prayDetail/${v.id}`)}>
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

export default MyPraylist;