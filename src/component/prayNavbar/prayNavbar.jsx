import React from 'react'
import { NoticeBar} from 'antd-mobile'
import {connect} from 'react-redux'

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
                    icon={null} 
                    action={ <div> </div>     }
                    marqueeProps={{ loop: true, style: { padding: '0 10px', fontSize:16 }}}
                >
                    <span className='mr-20'><span className='c-black'>XXX</span>供灯2盏</span>
                    <span className='mr-20'><span className='c-black'>XXX</span>供灯3盏</span>
                    <span className='mr-20'><span className='c-black'>XXX</span>供灯1盏</span>
                </NoticeBar>
        )
    }
}

export default PrayNavbar;