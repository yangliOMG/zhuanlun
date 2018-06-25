import React from 'react'
import {withRouter} from 'react-router-dom'    
import { Button, NavBar,Icon} from 'antd-mobile'
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux'
import TabEx from  './tabEx.jsx'
import {directionDictionary, recommendAI} from '../../util'
import {updateOrder} from '../../redux/order.redux'
import Tem from '../../service/temple-service.jsx'

import './lampDetail.less'

const _temple = new Tem()

@withRouter 
@connect(
    state=>state.order,
    {updateOrder}
)
class LampDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : [
                [
                    [{id:1,state:1},{id:2,state:1},{id:3,state:0},{id:4,state:1},{id:5,state:0},{id:6,state:0},{id:7,state:0},{id:8,state:0}],
                ],
                [
                    [{id:22,state:0},{id:12,state:1},{id:23,state:0},{id:24,state:1},{id:25,state:0},{id:26,state:0},{id:27,state:0},{id:9,state:0}],
                ],
                [
                    [{id:41,state:0},{id:42,state:1},{id:43,state:0},{id:44,state:1},{id:45,state:1},{id:46,state:0},{id:47,state:0},{id:0,state:0}],
                ],
            ],
            datas : [
                [
                    [{id:1,state:1},{id:2,state:1},{id:2,state:0},{id:3,state:1},{id:2,state:0},{id:2,state:0},{id:2,state:0},{id:2,state:0}],
                    [{id:1,state:1},{id:2,state:1},{id:2,state:0},{id:3,state:1},{id:2,state:0},{id:2,state:0},{id:2,state:0},{id:2,state:0}],
                    [{id:1,state:1},{id:2,state:1},{id:2,state:0},{id:3,state:1},{id:2,state:0},{id:2,state:0},{id:2,state:0},{id:2,state:0}],
                    [{id:1,state:1},{id:2,state:1},{id:2,state:0},{id:3,state:1},{id:2,state:0},{id:2,state:0},{id:2,state:0},{id:2,state:0}],
                    [{id:1,state:1},{id:2,state:1},{id:2,state:0},{id:3,state:1},{id:2,state:0},{id:2,state:0},{id:2,state:0},{id:2,state:0}],
                    [{id:1,state:1},{id:2,state:1},{id:2,state:0},{id:3,state:1},{id:2,state:0},{id:2,state:0},{id:2,state:0},{id:2,state:0}],
                    [{id:1,state:1},{id:2,state:1},{id:2,state:0},{id:3,state:1},{id:2,state:0},{id:2,state:0},{id:2,state:0},{id:2,state:0}],
                    [{id:1,state:1},{id:2,state:1},{id:2,state:0},{id:3,state:1},{id:2,state:0},{id:2,state:0},{id:2,state:0},{id:2,state:0}],
                    [{id:1,state:1},{id:2,state:1},{id:2,state:0},{id:3,state:1},{id:2,state:0},{id:2,state:0},{id:2,state:0},{id:2,state:0}],
                ],
                [
                    [{id:2,state:0},{id:12,state:1},{id:2,state:0},{id:13,state:1},{id:2,state:0},{id:2,state:0},{id:2,state:0}],
                ],
                [
                    [{id:2,state:0},{id:282,state:1},{id:2,state:0},{id:29,state:1},{id:3,state:1},{id:2,state:0},{id:2,state:0}],
                    [{id:2,state:0},{id:282,state:1},{id:2,state:0},{id:29,state:1},{id:3,state:1},{id:2,state:0},{id:2,state:0}],
                ],
            ],
            seledList : new Map(),
            curPage:0,
            lastPageHide:true,
            nextPageHide:false,
        }
    }

    componentWillMount(){
        const num = this.props.num , position = this.props.position
        const id = this.props.location.hash.replace("#","")
        if(id){
            _temple.getLayoutById(id).then(res=>{
                let layout = res.data
                if(res.status === 200){
                    _temple.getOccupyById(id).then(res=>{
                        let occupy = res.data
                        if(res.status === 200){
                            this.setState({
                                data: layout.map(arrd=>
                                        arrd.map(arr=>
                                            arr.map(id=>({id,state: occupy.includes(id)?1:0}))     //0可选，1不可选，2已选
                                        )
                                ),
                            })
        
                            if(position.length>0){
                                position.forEach((arr,idx)=>{
                                    this.seatSelection(...arr[0])})
                            }else if(num && num>0){
                                this.handleRecBtnClick(num)
                            }
                        }
                    })
                }
            })
        }
    }

    handleRecBtnClick(num){
        let data = this.state.data
        let recArrIdx = recommendAI(data,num)
        recArrIdx.forEach((v,idx)=>this.seatSelection(...v))
    }
    
    turnPage(curPage){
        curPage = Number(curPage)
        const lastPageHide = curPage===0
        const nextPageHide = this.state.data.length===(curPage+1)
        this.setState({
            curPage,lastPageHide,nextPageHide
        })
    }
    seatSelection(idx,idx1,idx2){
        let data = this.state.data
        let seledList = this.state.seledList
        let lampdata = data[idx][idx1][idx2]
        if(lampdata.state===0){
            lampdata.state = 2
            seledList.set(lampdata.id,[`${directionDictionary(idx)}${Number(idx1)+1}层第${(Number(idx2)+1+"").padStart(3,0)}位`,
                `${['N','EN','E','SE','S','WS','W','WN'][idx]}${idx1+1}${idx2+1}`])
        }else if(lampdata.state===2){
            seledList.delete(lampdata.id)
            lampdata.state = 0
        }
        this.setState({
            data,seledList
        })
        this.turnPage(idx)
    }
    handleSeatDelete(id){
        // let data = this.state.data
        // data.forEach(arrd=>
        //     arrd.forEach(arr=>
        //         arr.forEach(i=>i.state===2?i.state=0:'' )
        //     )
        // )
        let re = new RegExp('"id":'+id+',"state":2','ig')
        let data = JSON.parse(JSON.stringify(this.state.data).replace(re,'"id":'+id+',"state":0'))
        this.state.seledList.delete(id)
        this.setState({
            data,
            seledList:this.state.seledList
        })
    }
    handleSureSelectClick(){
        const value = {position:[...this.state.seledList],num:this.state.seledList.size}
        this.props.updateOrder(value)
        this.props.onClose(value)
    }

    render(){
        const selednum = this.state.seledList.size
        const btnList = [{type:1,name:'1盏'},{type:2,name:'2盏'},{type:3,name:'3盏'},{type:4,name:'4盏'}]
        const data = this.state.data
        return (
            <div className ='bodyBackgroundColor max-h'>
                <NavBar 
                    icon={<span className="navleft"><Icon type="left" /><span id="pagetitle">选择灯位</span></span>} 
                    mode='light' 
                    onLeftClick={()=>this.props.onClose()}
                    ></NavBar>
                <div className='state-bar'>  
                    <div style={{flex: '1 1' }} ><FontAwesome name={'square-o'} />可供灯位</div>
                    <div style={{flex: '1 1' }} ><FontAwesome name={'dot-circle-o'} style={{color:'#aaa' }}/>已供灯位</div>
                    <div style={{flex: '1 1' }} ><FontAwesome name={'check-square'} style={{color:'#4dbe4e' }} />已选</div>
                </div>
                <div className={`area ${selednum===0?'':'b187'}`}>
                    <TabEx data={data} curPage={this.state.curPage}
                        turnPage={(idx)=>this.turnPage(idx)} 
                        seatSelection={(idx,idx1,idx2)=>this.seatSelection(idx,idx1,idx2)}
                    ></TabEx>
                </div>
                <div className="fixed-bar">
                    <div className='field-bar'>
                        <div style={{flex: '1 1' }} >
                            <FontAwesome name={'chevron-left'} className={`${this.state.lastPageHide&&'hidden'}`} />
                        </div>
                        <div style={{flex: '12 1'}} className="titleCard">
                            <div className="channel-box" style={{transform: `translate(-${this.state.curPage}00%,0)`  }}>
                                {data.map((v,idx)=>
                                    <div className="channel" key={idx}>福佑灯塔 <span className='c-orange'>{directionDictionary(idx)}</span></div>
                                )}
                            </div>
                        </div>
                        <div style={{flex: '1 1' }} >
                            <FontAwesome name={'chevron-right'} className={`${this.state.nextPageHide&&'hidden'}`} />
                        </div>
                    </div>
                    <div className={`recom-bar ${selednum!==0&&'hidden'}`}>  
                        <div>推荐灯位</div>
                        {btnList.map((v,idx)=>
                            <div className="radiobutton" key={v.type} onClick={()=>this.handleRecBtnClick(v.type)}>{v.name}</div>
                        )}
                    </div>
                    <div className={`seled-bar ${selednum===0?'hidden':'showin'}`}>  
                        <div className="seled-div">
                            <div style={{padding: '0 10px' }}>
                                <div className="nowrap">
                                    {[...this.state.seledList].map((v,idx)=>
                                        <div className="nameplate orangeBtn radius" key={v[0]}>{v[1][0]}
                                            <FontAwesome name={'times-circle'} className='timecircle' size='lg'
                                                onClick={()=>this.handleSeatDelete(v[0])}/>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Button type="warning" onClick={()=>this.handleSureSelectClick()}
                                >{selednum!==0?('已选'+selednum+'个 '):''}确认选位</Button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default LampDetail;