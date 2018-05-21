import React from 'react'
import { NavBar,Icon, Button, WhiteSpace ,Card ,WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import FontAwesome from 'react-fontawesome';
// import {Redirect} from 'react-router-dom'

// import {update} from '../../redux/user.redux'
import PrayNavbar from '../../component/prayNavbar/prayNavbar.jsx'

@connect(
    state=>state.user,
    // {update}
)
class Tower extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            obj :
                {
                    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526464293949&di=1cf8a781791ec773f4faaff41ccb3dc8&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F2fdda3cc7cd98d10015049ac2b3fb80e7aec90a2.jpg',
                    title:'飞来峰1号祈福塔',
                    id:'ta123',
                    des: '灵隐寺飞来峰1号祈福塔简介',
                },
            care:false
        }
    }
    handleClick(){
        this.setState({
            care:!this.state.care
        })
    }

    render(){
        const obj = this.state.obj;
        return (
            <div>
                <NavBar 
                    icon={<Icon type="left" />} 
                    mode='dard' 
                    onLeftClick={()=>this.props.history.goBack()}
                    >{obj.title}</NavBar>
                <PrayNavbar />
                <WhiteSpace />
                <div style={{ textAlign: 'center',position:'relative' }}>
                    <img style={{ maxHeight: '260px' }} src={obj.img} alt="" />
                    <div style={{ margin: '10px' }}>
                        已供灯数199，总灯数200
                    </div>
                    <FontAwesome 
                        onClick={()=>this.handleClick()}
                        name={this.state.care?'star':'star-o'} 
                        size='2x'
                        style={{position:'absolute', top:0, right:10, color:`${this.state.care?'orange':'black'}` }} />
                </div>
                <WingBlank size="lg">
                    <Card>
                        <Card.Body>
                            <div  style={{ textAlign: 'center' }}>{obj.des}</div>
                        </Card.Body>
                    </Card>
                    <WhiteSpace />
                    <Button 
                        type="primary" 
                        onClick={()=>this.props.history.push(`/prayForm`)}
                        >我要祈福</Button>
                </WingBlank>
                <WhiteSpace size="lg" />
                
            </div>
        )
    }
}

export default Tower;