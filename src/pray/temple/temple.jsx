import React from 'react'
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'

import PrayNavbar from '../../component/prayNavbar/prayNavbar.jsx'
import Tem from '../../service/temple-service.jsx'

import './gridDefine.css'

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
        const id = this.props.location.hash.replace("#","")
        _temple.getTempleById(id).then(res=>{
            if(res.status === 200){
                this.setState({
                    ...res.data,
                    temple : res.data.temple[0]
                })
                document.getElementById("navbar").getElementsByClassName("am-navbar-title")[0].innerHTML = this.state.temple.name
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
                <PrayNavbar />
                <div style={{ padding: '50px 15px 10px',background:`url(${temple.ico||defaultTemImg}) 0 0/100% 100%`,position:'relative',height:'120px' }} 
                    onClick={()=>this.handleClick(temple.id)}>
                    <div style={{position:'absolute',height:'100%',width:'100%', top:0, left:0, background:`rgba(0,0,0,0.5)`}}>
                        <div style={{ display: 'flex', margin: '60px 10px 10px', color:'white' }}>
                            <img style={{ height: '60px', marginRight: '15px' }} src={temple.ico||defaultTemImg} alt="" />
                            <div style={{ lineHeight: 1 }}>
                                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{temple.name}（{temple.province+'/'+temple.sect}）</div>
                                <div className="text-overflow6">
                                    {templeMaterial.map((v,idx)=>
                                        v.content
                                    )}
                                </div>
                            </div>
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
                                    <div className="d-flexitem-content">
                                        <div className="d-flexitem-inner-content">
                                            <img className="d-flexitem-icon" src={v.ico||defaultTowImg} alt=""/>
                                            <div className="d-flexitem-text">{v.tname+' '+ v.name}</div>
                                            <div className="d-flexitem-tips">{new Date(v.produceDate).toLocaleString()}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {/* <div style={{ position: 'fixed', width: '100%', bottom: '0' }}> */}
                    <div style={{ padding: '10px',background: '#ca8200',borderRadius: '7px', }}>
                        <div style={{ paddingBottom: '10px',color: '#ffd890' }}>供灯加持文</div>
                        <div style={{ display: 'flex', color:'white' }}>
                            <img style={{ height: '60px', marginRight: '15px' }} src="http://img2.imgtn.bdimg.com/it/u=591319322,3930376284&fm=214&gp=0.jpg" alt="" />
                            <div style={{ lineHeight: 1 }}>
                                <div>心是一盏灯，佛光来启明</div>
                                <div>燃尽一切尘，全体大光明</div>
                                <div>佛前供盏灯，真诚最感通</div>
                                <div>心佛与众生，齐发大光明</div>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        )
    }
}

export default Temple;