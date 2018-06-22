import React from 'react'
import { Button, WhiteSpace ,WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
// import FontAwesome from 'react-fontawesome';

import {showToast } from '../../util'
import Tem from '../../service/temple-service.jsx'

import './templeDetail.less'

const _temple = new Tem()
const defaultTemImg = 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=e599da6bbea1cd1111bb7a72d87ba399/a8ec8a13632762d0ea469ae4a4ec08fa513dc674.jpg'

@connect(
    state=>state.user,
    // {update}
)
class TempleDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            temple : {},
            facility:[],
            templeMaterial:[],
            care:false
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
            }
        })
    }

    handleClick(id){
        this.setState({
            care:!this.state.care
        })
        showToast(!this.state.care?'已收藏':'取消收藏')
    }

    render(){
        const temple = this.state.temple
        const templeMaterial = this.state.templeMaterial
        return (
            <div>
                <WingBlank size="lg">
                    <WhiteSpace />
                    <div className='content radius'>
                        <div className='title'>关于<span className="c-orange">寺院</span></div>

                        <div className='name'>
                            <div className='l'>{temple.name}</div>    
                            <div className='r'>主持：法师</div>    
                        </div>
                        <img style={{width: '100%'}} src={temple.ico||defaultTemImg} alt="" />
                        <div>
                            {templeMaterial.map((v,idx)=>
                                v.content
                            )}
                        </div>
                        <WhiteSpace />
                    </div>
                </WingBlank>
                
                <WhiteSpace />
                <Button 
                    type="warning" className="orangeBtn"
                    onClick={()=>this.props.history.goBack()}
                    >我要祈福</Button>
                <WhiteSpace size="lg" />
                
            </div>
        )
    }
}

export default TempleDetail;