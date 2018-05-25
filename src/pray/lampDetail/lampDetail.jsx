import React from 'react'
import { Button} from 'antd-mobile'
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'
import TabEx from  './tabEx.jsx'
import {numberDictionary, recommendAI} from '../../util'
import {updateOrder} from '../../redux/order.redux'
import './lampDetail.css'


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
                    [0,1,0,1,0,0,0,0,0],
                    [0,1,0,1,0,0,1,0,0],
                    [0,1,0,1,0,0,0,0,0],
                    [0,1,0,1,0,0,0,0,0],
                ],
                [
                    [0,0,0,0,0,0,0,0,0],
                    [0,1,0,1,0,0,0,0,0],
                    [0,1,0,1,1,1,1,1,0],
                    [0,1,0,1,0,0,1,0,0],
                ],
                [
                    [0,1,0,1,0,0,1,0,0],
                    [0,1,0,1,0,1,0,0,0],
                    [0,1,0,1,0,0,1,0,0],
                    [0,1,0,1,1,1,0,1,0],
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
        if(position.length>0){
            position.forEach((arr,idx)=>{
                this.seatSelection(...arr[0])})
        }else if(num && num>0){
            this.handleRecBtnClick(num)
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
        if(data[idx][idx1][idx2]===0){
            data[idx][idx1][idx2] = 2
            seledList.set(`${idx}${idx1}${idx2}`,`${Number(idx)+1}面${Number(idx1)+1}层${(Number(idx2)+1+"").padStart(3,0)}位`)
        }else if(data[idx][idx1][idx2]===2){
            seledList.delete(`${idx}${idx1}${idx2}`)
            data[idx][idx1][idx2] = 0
        }
        this.setState({
            data,seledList
        })
        this.turnPage(idx)
    }
    handleSeatDelete(){
        let data = JSON.parse(JSON.stringify(this.state.data).replace(/2/g,'0'))
        this.setState({
            data,
            seledList:new Map()
        })
    }
    handleSureSelectClick(){
        
        this.props.updateOrder({position:[...this.state.seledList],num:this.state.seledList.size})
        this.props.history.goBack()
    }

    render(){
        const selednum = this.state.seledList.size
        const btnList = [{type:1,name:'1盏'},{type:2,name:'2盏'},{type:3,name:'3盏'},{type:4,name:'4盏'}]
        const data = this.state.data
        return (
            <div>
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
                        <div style={{flex: '12 1',borderRadius: '25px',background: '#aaa',overflow: 'hidden'}} >
                            <div className="channel-box" style={{transform: `translate(-${this.state.curPage}00%,0)`  }}>
                                {data.map((v,idx)=>
                                    <div className="channel" key={idx}>祈福塔第{numberDictionary(idx)}面</div>
                                )}
                            </div>
                        </div>
                        <div style={{flex: '1 1' }} >
                            <FontAwesome name={'chevron-right'} className={`${this.state.nextPageHide&&'hidden'}`} />
                        </div>
                    </div>
                    <div className='state-bar'>  
                        <div style={{flex: '1 1' }} ><FontAwesome name={'square-o'} />可供灯位</div>
                        <div style={{flex: '1 1' }} ><FontAwesome name={'dot-circle-o'} style={{color:'#aaa' }}/>已供灯位</div>
                        <div style={{flex: '1 1' }} ><FontAwesome name={'check-square'} style={{color:'#4dbe4e' }} />已选</div>
                    </div>
                    <div className={`recom-bar ${selednum!==0&&'hidden'}`}>  
                        <div>推荐灯位</div>
                        {btnList.map((v,idx)=>
                            <Button className="radiobutton" size="small" inline key={v.type}
                                type='ghost'
                                onClick={()=>this.handleRecBtnClick(v.type)}>{v.name}</Button>
                        )}
                    </div>
                    <div className={`seled-bar ${selednum===0?'hidden':'showin'}`}>  
                        <div className="seled-div">
                            <div style={{padding: '0 10px' }}>
                                <div>已选灯位
                                    <FontAwesome name={'times-circle'} size="2x" 
                                        onClick={()=>this.handleSeatDelete()}
                                        style={{color:'#bbb',float:'right',lineHeight: '30px' }}/>
                                </div>
                                <div className="nowrap">
                                    {[...this.state.seledList].map((v,idx)=>
                                        <div className="nameplate" key={v[0]}>{v[1]}</div>
                                    )}
                                </div>
                            </div>
                            <Button type="primary"
                                    onClick={()=>this.handleSureSelectClick()}
                            >{selednum!==0?('已选'+selednum+'个 '):''}确认选位</Button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default LampDetail;