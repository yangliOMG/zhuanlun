import React from 'react'
import { NavBar,Icon} from 'antd-mobile'
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'

// import {update} from '../../redux/user.redux'
import PrayNavbar from '../../component/prayNavbar/prayNavbar.jsx'
import './gridDefine.css'
@connect(
    state=>state.user,
    // {update}
)
class Temple extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            obj :
                {
                    img: 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=e599da6bbea1cd1111bb7a72d87ba399/a8ec8a13632762d0ea469ae4a4ec08fa513dc674.jpg',
                    title:'灵隐寺',
                    id:'qwer',
                    des: '灵隐寺始建于东晋咸和元年(公元326年),至今已有约一千七百年的历史,为杭州最早的名刹.地处杭州西湖以西,背靠北高峰,面朝飞来峰,两峰挟峙,林木耸秀,深山古寺',
                },
        }
    }
    handleClick(id){
        this.props.history.push(`/templeDetail/${id}`)
    }

    render(){
        const obj = this.state.obj
        const data = Array.from(new Array(2)).map((_val, i) => ({
            id:`${i+1}`,
            icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526451582347&di=72ff2b8aa694b5d4b92f001c05f487cc&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fy4%2FM02%2FD8%2F9C%2FwKhQiFUJxtiEWWepAAAAAJQnTd4876.jpg',
            text: `飞来峰${i+1}号塔`,
            tips: `已供100，总灯数200`,
        }));
        let re = [],lishi=[];
        data.forEach((val,idx)=>{
            if(idx%2===0){
                lishi=[];
                lishi.push(val)
                re.push(lishi)
            }else{
                lishi.push(val)
            }
        })
        return (
            <div>
                {/* <NavBar 
                    icon={<Icon type="left" />} 
                    mode='dard' 
                    onLeftClick={()=>this.props.history.goBack()}
                    >{obj.title}</NavBar> */}
                <PrayNavbar />
                <div style={{ padding: '50px 15px 10px',background:`url(${obj.img}) 0 0/100% 100%`,position:'relative',height:'120px' }} 
                    onClick={()=>this.handleClick(obj.id)}>
                    <div style={{position:'absolute',height:'100%', top:0, left:0, background:`rgba(0,0,0,0.5)`}}>
                        <div style={{ display: 'flex', margin: '60px 10px 10px', color:'white' }}>
                            <img style={{ height: '60px', marginRight: '15px' }} src={obj.img} alt="" />
                            <div style={{ lineHeight: 1 }}>
                                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.title}</div>
                                <div className="text-overflow6">{obj.des}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {re.map((row,idx)=>
                        <div className="d-flexbox" key={idx}>
                            {row.map((v,idx)=>
                                <div className="d-flexitem" 
                                    key={v.id} 
                                    onClick={()=> this.props.history.push(`/tower#${v.id}`)}>
                                    <div className="d-flexitem-content">
                                        <div className="d-flexitem-inner-content">
                                            <img className="d-flexitem-icon" src={v.icon} alt=""/>
                                            <div className="d-flexitem-text">{v.text}</div>
                                            <div className="d-flexitem-tips">{v.tips}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div style={{ position: 'fixed', width: '100%', bottom: '0' }}>
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
                </div>
            </div>
        )
    }
}

export default Temple;