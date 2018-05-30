import React from 'react'
import { Button, WhiteSpace ,Card ,WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import FontAwesome from 'react-fontawesome';

import {showToast } from '../../util'
import Tem from '../../service/temple-service.jsx'

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
                <WingBlank size="sm">
                    <Card>
                        <Card.Body>
                            <div style={{position:'relative' }}>
                                <div style={{ margin: '10px' }}>关于寺院</div>
                                <FontAwesome 
                                    onClick={()=>this.handleClick()}
                                    name={this.state.care?'star':'star-o'} 
                                    size='2x'
                                    style={{position:'absolute', top:0, right:10, color:`${this.state.care?'orange':'black'}` }} />

                                <div style={{ display: 'flex', margin: '10px'}}>
                                    <img style={{ height: '60px', marginRight: '15px' }} src={temple.ico||defaultTemImg} alt="" />
                                    <div style={{ lineHeight: 1 }}>
                                        <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{temple.name}</div>
                                        <div>
                                            {templeMaterial.map((v,idx)=>
                                                v.content
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {templeMaterial.map((v,idx)=>
                                        v.content
                                    )}
                                </div>
                                <WhiteSpace />
                                <img style={{ width: '100%'}} src="https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=4aeb0bc0560fd9f9b41a5d3b4444bf4f/314e251f95cad1c80695d89b783e6709c93d515b.jpg" alt=""/>
                            </div>
                        </Card.Body>
                    </Card>
                </WingBlank>
                
                <WhiteSpace />
                <WingBlank size="lg">
                    <Button 
                        type="primary" 
                        onClick={()=>this.props.history.goBack()}
                        >我要祈福</Button>
                </WingBlank>
                <WhiteSpace size="lg" />
                
            </div>
        )
    }
}

export default TempleDetail;