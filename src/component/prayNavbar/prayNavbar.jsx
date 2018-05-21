import React from 'react'
import { NoticeBar} from 'antd-mobile'
import {connect} from 'react-redux'
import FontAwesome from 'react-fontawesome';

// import {Redirect} from 'react-router-dom'

// import {update} from '../../redux/user.redux'
import './prayNavbar.css'

@connect(
    state=>state.user,
    // {update}
)
class PrayNavbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return (
                <NoticeBar 
                    mode="link" 
                    icon={<FontAwesome name='bars' size='lg' style={{color:'green' }} />} 
                    action={<FontAwesome name='bars' size='lg' style={{color:'green' }} />}
                    marqueeProps={{ loop: true, style: { padding: '0 10px', fontSize:30 }}}
                >XXX在灵隐寺为xxx点灯，祝愿他身体健康、万事如意
                </NoticeBar>
        )
    }
}

export default PrayNavbar;