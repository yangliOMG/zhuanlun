import React from 'react'
import { WhiteSpace } from 'antd-mobile'

import {ajaxTempleMessage} from '../../service/asyncFun'
import { ArrayFormat, getQueryString } from '../../util'
import { withContext } from '../../context'

import './gridDefine.less'

@withContext
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
        const id = getQueryString("id")
        ajaxTempleMessage(id, res =>{
            this.setState({ ...res, temple : res.temple[0] })
            document.title = res.temple[0].name
        })
    }

    handleClick(id){
        this.props.history.push(`/templeDetail#${id}`)
    }
    handleClickPray(id,e){
        e.preventDefault()
        this.props.context.init('order')
        window.location.href = `/pay/prayForm?src=${1}#${id}`
    }

    render(){
        const {temple, facility, templeMaterial} = this.state
        let rowData = ArrayFormat(facility)
        return (
            <div>
                <WhiteSpace />
                <div className='titlecard radius' style={{ backgroundImage: temple.ico?`url(${temple.ico})`:'' }} 
                    onClick={()=>this.handleClick(temple.id)}>
                    <div className='title'>
                        <div className='name'>{temple.name}</div>
                        <div className='c-erji pd-5 text-overflow'>
                            {templeMaterial.filter(v=>v.name!=='主持').map((v,idx)=>
                                v.content
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    {
                        facility.length===1?
                        <div className="d-flexbox" onClick={(e)=> this.handleClickPray(facility[0].facility.id,e)}>
                            <div className='temCard radius'>
                                <div className='img'>   
                                    <img className='ico' src={facility[0].facility.ico||require('./tower.jpg')} alt="" />
                                </div>
                                <div className='ti'>
                                    <div className='title'>{facility[0].facility.tname+' '+ facility[0].facility.name}</div>
                                    <div className="d-tips">
                                        <span className='lampIcon l-shan tini'></span>{facility[0].bright}&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span className='lampIcon l-bushan tini'></span>{facility[0].lightNum-facility[0].bright}
                                    </div>
                                    <div className="d-qifu orangeBtn">我要祈福</div>
                                </div>
                            </div>
                        </div>
                        :
                        rowData.map((row,idx)=>
                            <div className="d-flexbox" key={idx}>
                                {row.map((v,idx)=>
                                    <div className="d-flexitem" key={v.facility.id} 
                                        onClick={(e)=> this.handleClickPray(v.facility.id,e)}>
                                        <div className="d-content radius">
                                            <img className="d-img" src={v.facility.ico||require('./tower.jpg')} alt=""/>
                                            <div className="d-text">
                                                <div className="d-name">{v.facility.tname+' '+ v.facility.name}</div>
                                                <div className="d-tips">
                                                    <span className='lampIcon l-shan tini'></span>{v.bright}&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className='lampIcon l-bushan tini'></span>{v.lightNum-v.bright}
                                                </div>
                                            </div>
                                            <div className="d-qifu orangeBg">我要祈福</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    }
                </div>
                
                <div className='botCard c-erji radius' onClick={()=>this.props.history.push(`/haochu`)}>
                    <img className='img' src={require('./foqian.jpg')} alt="" />
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