import React from 'react'
import { WingBlank, WhiteSpace,  List, Button, Toast } from 'antd-mobile'
import {connect} from 'react-redux'

import VBtn from '../../component/vercodeBtn/vercodeBtn.jsx'

import {showToast, getStorage } from '../../util'
import { TO_GET_USERINFO, TO_GET_VERCODE, TO_PUT_PHONE } from '../../constant/actionType'

import  "./myPhone.less"

@connect(()=>({}),
    dispatch => ({
        getUserinfo: (payload,callback) => dispatch({type: TO_GET_USERINFO, payload,callback}),
        sendVerCode: (payload, callback, callback2) => dispatch({type: TO_GET_VERCODE, payload, callback, callback2}),
        submitPhone: (payload, callback, callback2) => dispatch({type: TO_PUT_PHONE, payload, callback, callback2}),
    })
)
class MyPhone extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            flag:false,
            phone:'',
            inputphone:'',
            vercode:'',
        }
    }

    componentWillMount(){
        const openid = getStorage('user').openid
        this.props.getUserinfo({openid},(res)=>{
            this.setState({ phone: res, flag:true })
        })
    }

    handleChange(event,key){
        this.setState({[key]: event.target.value})
    }

    handleSubmitPhone(){
        const { inputphone, vercode } = this.state
        Toast.loading('加载中...',0)
        this.props.submitPhone({tel:inputphone,code:vercode}, 
            mes=> showToast( mes,2), 
            ()=> setTimeout(()=>this.props.history.goBack(), 1000)
        )
    }

    render(){
        const { flag, phone, inputphone, vercode,} = this.state
        const { sendVerCode } = this.props
        return (
            <div>
                <WhiteSpace/>
                <WingBlank size="lg">

                    <List className={`radius phonePannel ${!flag&&'hidden'}`}>
                        <div className='pt-30'>绑定的手机号：{phone}</div>
                        <div className='pd-30'>
                            <div className='changebtn' onClick={()=>this.setState({flag: false})}>更换手机号</div>
                        </div>
                    </List>
                    <div className={`${flag&&'hidden'}`}>
                        <List className='radius phonePannel'>
                            <div className='bordbot'>
                                <input type="text" className="inputBot" placeholder="输入您的手机号" 
                                    onChange={(event)=>this.handleChange(event,'inputphone')} value={inputphone}  />
                            </div>
                            <table>
                                <tbody>
                                <tr>
                                    <td><input type="text" className="inputBot" placeholder="验证码"
                                        onChange={(event)=>this.handleChange(event,'vercode')} value={vercode} /></td>
                                    <td width="92">
                                        <VBtn className="codebtn" inputphone={inputphone} 
                                            sendVerCode={ (phone,fn1,fn2) => sendVerCode({phone},fn1,fn2)}/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </List>
                        <WhiteSpace/>
                        <Button type="warning" className="orangeBtn"
                            onClick={()=>this.handleSubmitPhone()}
                            >确认</Button>
                    </div>
                </WingBlank>
            </div>
        )
    }
}

export default MyPhone;