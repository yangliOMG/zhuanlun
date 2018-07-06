import React from 'react'
import {connect} from 'react-redux'

import { newOrder} from '../../redux/order.redux'
import Tem from '../../service/temple-service.jsx'

import './gridDefine.less'

const _temple = new Tem()

@connect(
    state=>state,
    {newOrder}
)
class Temple extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            temple : {},
            facility:[],
            templeMaterial:[]
        }
    }
    componentWillMount(){
        // const id = this.props.location.hash.replace("#","")
        _temple.getTempleById(1).then(res=>{
            if(res.status === 200){
                this.setState({
                    ...res.data,
                    temple : res.data.temple[0]
                })
                document.title = this.state.temple.name
            }
        })
    }

    handleClick(id){
        this.props.history.push(`/templeDetail#${id}`)
    }
    handleClickPray(id){
        this.props.newOrder()
        this.props.history.push(`/jpgmall/prayForm#${id}`)
    }

    render(){
        const temple = this.state.temple
        const facility = this.state.facility
        const templeMaterial = this.state.templeMaterial
        let rowData = [],hang=[];
        facility.forEach((val,idx)=>{
            if(idx%2===0){
                hang=[];
                hang.push(val)
                rowData.push(hang)
            }else{
                hang.push(val)
            }
        })
        return (
            <div>
                <div className='titlecard radius' style={{ backgroundImage:`url(${temple.ico||require('./linyinsi.jpg')})` }} 
                    onClick={()=>this.handleClick(temple.id)}>
                    <div className='title'>
                        <div className='name'>{temple.name}</div>
                        <div className='c-erji pd-5 text-overflow'>
                            {templeMaterial.map((v,idx)=>
                                v.content
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    {rowData.map((row,idx)=>
                        <div className="d-flexbox" key={idx}>
                            {row.map((v,idx)=>
                                <div className="d-flexitem" key={v.id} 
                                    onClick={()=> this.handleClickPray(v.id)}>
                                    <div className="d-content radius">
                                        <img className="d-img" src={v.ico||require('./tower.png')} alt=""/>
                                        <div className="d-text">
                                            <div className="d-name">{v.tname+' '+ v.name}</div>
                                            <div className="d-tips">
                                                <span className='lampIcon l-shan tini'></span>800&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span className='lampIcon l-bushan tini'></span>224
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className='botCard c-erji radius'>
                    <img className='img' src={require('./foqian.png')} alt="" />
                    <div>
                        <div className='title'>佛前供灯祈福</div>
                        <div>1.供灯两盏：福慧双增 大吉大利</div>
                        <div>2.供灯四盏：四平八稳 富运吉祥</div>
                        <div>3.供灯六盏：六六大顺 事事如意</div>
                        <div>4.供灯九盏：九九归一 万事吉祥</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Temple;