import React from 'react'
import { WhiteSpace, Card, WingBlank } from 'antd-mobile'
import {connect} from 'react-redux'


// import {update} from '../../redux/user.redux'
import  "./myPraylist.less"

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
                <WhiteSpace/>
                <WingBlank size="lg">
                    {this.state.praylist.map((v,idx)=>
                        <div key={v.id}>
                            <Card full className='radius prayLi' onClick={()=>this.props.history.push(`/prayDetail#${v.id}`)}>
                                <div className='prayHead orangeBg'>{v.template}</div>
                                <Card.Body>
                                    <div className='prayTitle'>
                                        <div className='imgBlock'><img src={v.img} alt="" style={{width:'100%'}} /></div>
                                        <div className='titBlock'>
                                            <div style={{paddingBottom:'5px'}}>{v.temple}</div>
                                            {v.position.map((pos,idx2)=>
                                                <div key={idx2} className='spand'>
                                                    <span className={`lampIcon l-shan tini`}></span>{pos[1]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>供灯时长：{v.time}</div>
                                    <div>供灯周期：2018年5月1日 8点18分-2018年6月1日</div>
                                    <div>已供时间：1天3小时</div>
                                    <div>供灯金额：{(v.total/100).toFixed(2)}元</div>
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