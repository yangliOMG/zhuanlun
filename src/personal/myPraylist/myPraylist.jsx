import React from 'react'
import { WhiteSpace, Card, WingBlank,Modal } from 'antd-mobile'

import {timeLongCount,duringDictionary,timeFormat,showToast,positionMesArray} from '../../util'
import { withContext } from '../../context'
import {ajaxPraylist, ajaxOrderDelete} from '../../service/asyncFun'
import  "./myPraylist.less"

@withContext
class MyPraylist extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        let { prayList, save} = this.props.context
        if( prayList.list.length===0){
            ajaxPraylist( res=>{
                prayList.list = res
                save({prayList})
            })
        }
    }

    handleDeleteClick(id,e){
        e.stopPropagation()
        Modal.alert('删除', '确认删除订单？', [
            { text: '取消' },
            { text: '确认', onPress: () => {
                ajaxOrderDelete({id},()=>{
                    let { prayList, save} = this.props.context
                    prayList.list = prayList.list.filter(v=>v.id!==id)
                    save({prayList})
                    showToast('刪除成功')

                })
            } },
        ])
    }

    handleContinueClick(id,fid,e){
        e.stopPropagation()
        window.location.href = `/pay/prayForm?pid=${id}&id=${fid}`
    }

    render(){
        const { list } = this.props.context.prayList
        return (
            <div>
                <WhiteSpace/>
                <WingBlank size="lg">
                    {list.map((v,idx)=>
                        <div key={v.id}>
                            <Card full className='radius prayLi' 
                                onClick={()=>window.location.href = `/pay/prayDetail?id=${v.id}`}>
                                <div className='prayHead orangeBg'>{v.blessing}</div>
                                <Card.Body>
                                    <div className='prayTitle'>
                                        <div className='imgBlock'><img src={require('./fo.jpg')||v.tico} alt="" style={{width:'100%'}} /></div>
                                        <div className='titBlock'>
                                            <div style={{paddingBottom:'5px'}}>{v.tname} {v.fname}</div>
                                            {v.dengwei.map(v=>positionMesArray(v.side,v.row,v.col,v.maxrow,"mode1")).map((val,idx2)=>
                                                <div key={idx2} className='spand'>
                                                    <span className='lampIcon l-shan tini'></span>
                                                    {val[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>供灯时长：{duringDictionary().find(x=>x.type===v.duration).name}</div>
                                    { v.payStatus!==2?v.payStatus!==3?
                                        <div>支付状态：<span className='c-red b'>未支付</span></div>
                                        :
                                        <div>支付状态：<span className='c-red b'>支付超时</span></div>
                                        :
                                        <div>
                                            <div>供灯周期：{timeFormat(v.payTime).toLocaleString()}~
                                            <div className='textIndent5'>{timeFormat(v.closeTime).toLocaleString()}</div></div>
                                        <div>已供时间：{timeLongCount(v.payTime,v.closeTime)}</div>
                                        <div>供灯功德：{(v.sum/100).toFixed(2) }元</div></div>
                                            
                                    }
                                    <div className='btnRow'>
                                        <div className='lf' onClick={(e)=>this.handleDeleteClick(v.id,e)}>
                                            <div className='btn btnred'>删除订单</div>
                                        </div>
                                        <div className='rt'>查看详情 > </div>
                                    </div>
                                </Card.Body>
                            </Card>
                            <WhiteSpace/>
                        </div>
                    )}
                    <div className={`emptyList ${list.length===0?'':'hidden'}`}>祈福列表为空</div>
                </WingBlank>
            </div>
        )
    }
}

export default MyPraylist;