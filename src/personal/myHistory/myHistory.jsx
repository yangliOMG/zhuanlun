import React from 'react'
import { WingBlank, WhiteSpace } from 'antd-mobile'

import { withContext } from '../../context'
import {ajaxHistoryList} from '../../service/asyncFun'

import logo from '../../pray/temple/foqian.jpg';

import "./myHistory.less"

@withContext
class MyHistory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            historylist : []
        }
    }
    componentWillMount(){
        ajaxHistoryList({type:0},historylist=>{
            this.setState({historylist})
        })
    }

    render(){
        const {historylist} = this.state
        return (
            <div>
                <WhiteSpace/>
                <WingBlank size="lg">
                    <div className='li radius ofhd' onClick={()=>window.location.href = `/templeList`}>
                        <div className='imgBlock'><img src={logo} alt="" /></div>
                        <div className='textBlock'>
                            <div className='b name'>所有寺院</div>
                            <div className="text-overflow4a c-grey1 pt-20">点击前往寺庙列表页</div>
                        </div>
                    </div>
                    {historylist.map((v,idx)=>
                        <div key={v.temple[0].id}>
                            <WhiteSpace/>  
                            <div className='li radius ofhd' onClick={()=>this.props.history.push(`/temple?id=${v.temple[0].id}`)}>
                                <div className='imgBlock'><img src={v.temple[0].ico} alt="" /></div>
                                <div className='textBlock'>
                                    <div className='b name'>{v.temple[0].name}</div>
                                    <div className="text-overflow4a c-grey1">
                                        {v.templeMaterial.filter(v=>v.name!=='主持').map((v,idx)=>
                                            v.content
                                        )}</div>
                                </div>
                            </div>
                        </div>                        
                    )}
                    <div className={`emptyList ${historylist.length===0?'':'hidden'}`}>足迹为空</div>
                </WingBlank>
            </div>
        )
    }
}

export default MyHistory;