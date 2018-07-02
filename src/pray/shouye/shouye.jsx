import React from 'react'
import {Button} from 'antd-mobile'
import {connect} from 'react-redux'

// import {update} from '../../redux/user.redux'
// import AuthRoute from '../../component/authroute/authroute.jsx';

@connect(
    state=>state.user,
    // {update}
)
class Shouye extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:'',
        }
    }
    handleClick(path){
        this.props.history.push(path);
    }
    render(){
        return (
            <div>
                {/* <AuthRoute></AuthRoute> */}
                <div>
                <p>供灯的功德</p>
                    <p>在《大藏经》中，对供灯的功德介绍得很详细，有部经叫《佛为首迦长者说业报差别经》，里面宣讲了供灯的十种功德：</p>
                    <p>一、照世如灯。供灯者生生世世如同世间的明灯，转生为人也是人中之王，智慧的光明能照亮整个世界。</p>
                    <p>二、肉眼不坏。供灯者肉眼非常明亮，不会变成盲人，也不会成近视眼</p>
                    <p>三、得于天眼。供灯者将来会获得五眼中的天眼。</p>
                    <p>四、善恶智能。能辨别善法和恶法，懂得一切因果取舍。供灯者的智慧超越其他人。</p>
                    <p>五、灭除大暗。具有超胜的智慧，能灭除自他相续中的一切愚痴黑暗。</p>
                    <p>六、得智能明。自己的智慧超群众人，不受外界的各种诱惑，有辨别取舍的能力。</p>
                    <p>七、不在暗处。生生世世不会转生在邪见或者黑暗的地方，住于光明的殊胜之地。</p>
                    <p>八、具大福报。转生为具有大福报的众生。</p>
                    <p>九、命终生天。命终后不会堕入恶趣，而会转生天界。</p>
                    <p>十、速证涅槃。很快的时间中能证得圣者的果位。</p><p>供灯的功德</p>
                    <p>在《大藏经》中，对供灯的功德介绍得很详细，有部经叫《佛为首迦长者说业报差别经》，里面宣讲了供灯的十种功德：</p>
                    <p>一、照世如灯。供灯者生生世世如同世间的明灯，转生为人也是人中之王，智慧的光明能照亮整个世界。</p>
                    <p>二、肉眼不坏。供灯者肉眼非常明亮，不会变成盲人，也不会成近视眼</p>
                    <p>三、得于天眼。供灯者将来会获得五眼中的天眼。</p>
                    <p>四、善恶智能。能辨别善法和恶法，懂得一切因果取舍。供灯者的智慧超越其他人。</p>
                    <p>五、灭除大暗。具有超胜的智慧，能灭除自他相续中的一切愚痴黑暗。</p>
                    <p>六、得智能明。自己的智慧超群众人，不受外界的各种诱惑，有辨别取舍的能力。</p>
                    <p>七、不在暗处。生生世世不会转生在邪见或者黑暗的地方，住于光明的殊胜之地。</p>
                    <p>八、具大福报。转生为具有大福报的众生。</p>
                    <p>九、命终生天。命终后不会堕入恶趣，而会转生天界。</p>
                    <p>十、速证涅槃。很快的时间中能证得圣者的果位。</p>
                </div>
                <div>关键字</div>
                <div>
                    <Button type="primary" inline size="small" 
                            style={{ marginRight: '4px' }}
                            onClick={()=>this.handleClick('/templeList')}>寺院列表</Button>
                    <Button type="primary" inline size="small" 
                            style={{ marginRight: '4px' }}
                            onClick={()=>this.handleClick('/templeList')}>健康</Button>
                </div>
            </div>
        )
    }
}

export default Shouye;