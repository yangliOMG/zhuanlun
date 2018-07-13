import React from 'react'
import Order from '../../service/order-service.jsx'

import './prayScreen.less'

const _order = new Order()

class PrayForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        setInterval(() => {
            _order.getTopMes().then(res=>{
                if(res.status === 200){
                    const data = res.data.data
                    this.setState({data})
                }
            })
        }, 5000)
    }
    render(){
        return (
            <div>
                <div className='outLine'>
                    <marquee direction="scroll">
                        {
                            this.state.data.map((v,idx)=>
                                <span key={idx} className='bannel'><span className='c-white'>{v.prayman}</span>供灯{v.lednums}盏</span>
                            )
                        }
                    </marquee>
                </div>
            </div>
        )
    }
}

export default PrayForm;