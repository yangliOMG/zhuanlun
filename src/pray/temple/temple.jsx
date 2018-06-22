import React from 'react'
import {connect} from 'react-redux'
import FontAwesome from 'react-fontawesome';
// import {Redirect} from 'react-router-dom'

import Tem from '../../service/temple-service.jsx'

import './gridDefine.less'

const _temple = new Tem()
const defaultTemImg = 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=e599da6bbea1cd1111bb7a72d87ba399/a8ec8a13632762d0ea469ae4a4ec08fa513dc674.jpg'
const defaultTowImg = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526451582347&di=72ff2b8aa694b5d4b92f001c05f487cc&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fy4%2FM02%2FD8%2F9C%2FwKhQiFUJxtiEWWepAAAAAJQnTd4876.jpg'

@connect(
    state=>state.user,
    // {update}
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
                document.getElementById("pagetitle").innerHTML = this.state.temple.name
            }
        })
    }

    handleClick(id){
        this.props.history.push(`/templeDetail#${id}`)
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
                <div className='titlecard radius' style={{ backgroundImage:`url(${temple.ico||defaultTemImg})` }} 
                    onClick={()=>this.handleClick(temple.id)}>
                    <div className='title'>
                        <div className='name'>{temple.name}</div>
                        <div className='content text-overflow'>
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
                                <div className="d-flexitem" 
                                    key={v.id} 
                                    onClick={()=> this.props.history.push(`/tower#${v.id}`)}>
                                    <div className="d-content radius">
                                        <img className="d-img" src={v.ico||defaultTowImg} alt=""/>
                                        <div className="d-text">
                                            <div className="d-name">{v.tname+' '+ v.name}</div>
                                            <div className="d-tips">
                                                <FontAwesome name={'square-o'} style={{color:'orange' }} />800&nbsp;&nbsp;&nbsp;&nbsp;
                                                <FontAwesome name={'dot-circle-o'} style={{color:'#eee' }} />224
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className='botCard radius'>
                    <img className='img' src="http://img2.imgtn.bdimg.com/it/u=591319322,3930376284&fm=214&gp=0.jpg" alt="" />
                    <div>
                        <div className='title'>供灯加持文</div>
                        <div>心是一盏灯，佛光来启明</div>
                        <div>燃尽一切尘，全体大光明</div>
                        <div>佛前供盏灯，真诚最感通</div>
                        <div>心佛与众生，齐发大光明</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Temple;