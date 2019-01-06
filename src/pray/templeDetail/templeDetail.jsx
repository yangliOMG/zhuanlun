import React,{Fragment} from 'react'
import { Button, WhiteSpace ,WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'

import { TO_GET_TEMPLE, } from '../../constant/actionType'
import './templeDetail.less'


@connect( ()=>({}),
    dispatch => ({
        getTempleMessage: (payload, callback) => dispatch({type: TO_GET_TEMPLE, payload, callback}),
    })
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
        this.props.getTempleMessage({id}, res =>{
            this.setState({
                ...res,
                temple : res.temple[0]
            })
        })
    }

    render(){
        const { temple, templeMaterial } = this.state
        const zhuchi = templeMaterial.find(v=>v.name==='主持')
        return (
            <Fragment>
                <WingBlank size="lg">
                    <WhiteSpace />
                    <div className='content radius'>
                        <div className='title'>关于<span className="c-orange">寺院</span></div>

                        <div className='name'>
                            <div className='l'>{temple.name}</div>    
                            {zhuchi?
                                <div className={`r`}>主持：{zhuchi.content}</div>:''
                            }
                        </div>
                        <img style={{width: '100%'}} src={temple.ico} alt="" />
                        <div>
                            {templeMaterial.filter(v=>v.name!=='主持').map((v,idx)=>
                                <p key={idx}>{v.content}</p>
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
                
            </Fragment>
        )
    }
}

export default TempleDetail;