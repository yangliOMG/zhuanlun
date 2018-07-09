import React from 'react'
import { WingBlank, WhiteSpace } from 'antd-mobile'
import {connect} from 'react-redux'
import Tem from '../../service/temple-service.jsx'

// import { StickyContainer, Sticky } from 'react-sticky';

import "./myHistory.less"
const _temple = new Tem()
@connect(
    state=>state.user,
    // {update}
)
class MyHistory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            historylist : []
        }
    }
    componentWillMount(){
         _temple.getHistoryListByType(0).then(res=>{
            const list = [...new Set(res.data.map(v=>v[3]))]
            const promise = list.map(id=>_temple.getTempleById(id))
            Promise.all(promise).then(res=>{
                let historylist = res.map(i=>i.data)
                this.setState({historylist})
            })
        })
    }

    render(){
        return (
            <div>
                <WhiteSpace/>
                <WingBlank size="lg">
                    {this.state.historylist.map((v,idx)=>
                        // <StickyContainer key={v.id}>
                        //   <Sticky>
                        //     {({style,}) => (
                        //       <header style={{...style,zIndex: 3,backgroundColor: '#eee',
                        //       }}>{v.time}</header>
                        //     )}
                        //   </Sticky>
                        <div key={v.temple[0].id}>
                            <WhiteSpace/>  
                            <div className='li radius ofhd' onClick={()=>this.props.history.push(`/temple#${v.temple[0].id}`)}>
                                <div style={{flex:'7 1'}}><img src={v.temple[0].ico} alt="" style={{width:'100%'}} /></div>
                                <div style={{flex:'8 1',padding:'0 5px'}}>
                                    <div className='b name'>{v.temple[0].name}</div>
                                    <div className="text-overflow3 c-grey1">
                                        {v.templeMaterial.filter(v=>v.name!=='主持').map((v,idx)=>
                                            v.content
                                        )}</div>
                                </div>
                            </div>
                        </div>                        

                        // </StickyContainer>  
                    )}
                    <div className={`emptyList ${this.state.historylist.length===0?'':'hidden'}`}>足迹为空</div>
                </WingBlank>
            </div>
        )
    }
}

export default MyHistory;