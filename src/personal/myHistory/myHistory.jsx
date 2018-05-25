import React from 'react'
import {  Card } from 'antd-mobile'
import {connect} from 'react-redux'
import { StickyContainer, Sticky } from 'react-sticky';

import "./myHistory.css"
@connect(
    state=>state.user,
    // {update}
)
class MyHistory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            carelist : [
                {
                    id:122,
                    type: "temple",
                    time:'2015-3-2',
                    title:"灵隐寺",
                    content:'灵隐寺始建于东晋咸和元年(公元326年),至今已有约一千七百年的历史,为杭州最早的名刹.地处杭州西湖以西,背靠北高峰,面朝飞来峰,两峰挟峙,林木耸秀,深山古寺',
                    img:'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=e599da6bbea1cd1111bb7a72d87ba399/a8ec8a13632762d0ea469ae4a4ec08fa513dc674.jpg',

                },{
                    id:112,
                    type: "tower",
                    time:'2016-3-2',
                    title:"灵隐寺 飞来峰 1号塔",
                    content:'灵隐寺 飞来峰 1号塔',
                    img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526451582347&di=72ff2b8aa694b5d4b92f001c05f487cc&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fy4%2FM02%2FD8%2F9C%2FwKhQiFUJxtiEWWepAAAAAJQnTd4876.jpg',
                },
            ]
        }
    }

    render(){
        return (
            <div>
                {this.state.carelist.map((v,idx)=>
                    <StickyContainer key={v.id}>
                      <Sticky>
                        {({style,}) => (
                          <header style={{...style,zIndex: 3,backgroundColor: '#eee',
                          }}>{v.time}</header>
                        )}
                      </Sticky>
                      <Card full onClick={()=>this.props.history.push(`/${v.type}/${v.id}`)}>
                          <Card.Body>
                              <div style={{display:'flex'}}>
                                  <div style={{flex:'1 1'}}><img src={v.img} alt="" style={{width:'100%'}} /></div>
                                  <div style={{flex:'2 1',padding:'0 5px'}}>
                                      <div style={{textAlign:'center',fontWeight:'bold'}}>{v.title}</div>
                                      <div className="text-overflow6">&nbsp;&nbsp;&nbsp;{v.content}</div>
                                  </div>
                              </div>
                          </Card.Body>
                      </Card>
                    </StickyContainer>  
                )}
            </div>
        )
    }
}

export default MyHistory;