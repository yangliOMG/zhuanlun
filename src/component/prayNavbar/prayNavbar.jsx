import React from 'react'
import { NoticeBar} from 'antd-mobile'
import './prayNavbar.css'
// import Order from '../../service/order-service.jsx'

// const _order = new Order()
// class PrayNavbar extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             data:[]
//         }
//     }
//     componentWillMount(){
//         const fid = window.location.hash.replace(":","")
//         _order.getTopMes(fid).then(res=>{
//             if(res.status === 200){
//                 const data = res.data.data
//                 this.setState({data})
//             }
//         })
//     }

//     render(){
//         console.log(this)
//         return (
//                 <NoticeBar 
//                     mode="link" 
//                     icon={null} 
//                     action={ <div> </div>}
//                     marqueeProps={{ loop: true, style: { padding: '0 10px', fontSize:16 }}}
//                 >
//                     {
//                         this.state.data.map((v,idx)=>
//                             <span key={idx} className='mr-30'><span className='c-black'>{v.prayman}</span>供灯{v.lednums}盏</span>
//                         )
//                     }
//                 </NoticeBar>
//         )
//     }
// }

function PrayNavbar({data = [], descColor = '#ff6201', namecColor = 'black'}){      //sfc  无状态函数组件
    return (
        <NoticeBar 
            mode="link" 
            icon={null} 
            action={ <div> </div>}
            marqueeProps={{ loop: true, style: { padding: '0 10px', fontSize:16 }}}
        >
            {
                data.map((v,idx)=>
                    <span key={idx} className='mr-30' style={{color:descColor}}>
                        <span style={{color:namecColor}}>{v.prayman}</span>
                        供灯{v.lednums}盏
                    </span>
                )
            }
        </NoticeBar>
    )
}

export default PrayNavbar;