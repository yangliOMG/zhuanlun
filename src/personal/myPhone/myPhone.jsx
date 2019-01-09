import React from 'react'
import { WingBlank, WhiteSpace,  List, Button, Toast } from 'antd-mobile'

import {showToast, getStorage } from '../../util'
import { withContext } from '../../context'
import {ajaxUserinfo, ajaxVercode, ajaxPhonePut} from '../../service/asyncFun'

import  "./myPhone.less"


@withContext
class MyPhone extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            flag:false,
            phone:'',
            inputphone:'',
            vercode:'',
            disabled:false,
            btnContent:'获取验证码'
        }
    }

    componentWillMount(){
        const openid = getStorage('user').openid
        ajaxUserinfo({openid},(res)=>{
            this.setState({ phone: res, flag:true })
        })
    }

    handleGetvercode(){
        const { disabled, inputphone} = this.state
        if( disabled )
            return true;
        let phone = inputphone
        let preg = /^(((13[0-9]{1})|(15[0-35-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; //匹配手机号
        if( phone==='' || !preg.test(phone)){
            return showToast('请输入正确格式的电话号码')
        }else{
            let times=60, T = null
            T=setInterval(()=>{
                times--;
                if(times<=0){
                    this.setState({
                        disabled:false,
                        btnContent:'获取验证码'
                    })
                    clearInterval(T)
                }else{
                    this.setState({
                        disabled:true,
                        btnContent: times+'秒后重试'
                    })
                }
            },1000)
            ajaxVercode( {phone}, 
                mes=> showToast( mes,2),
                () => this.breakFlag = true
            )
        }
    }
    handleChange(event,key){
        this.setState({[key]: event.target.value})
    }

    handleSubmitPhone(){
        const { inputphone, vercode } = this.state
        Toast.loading('加载中...',0)
        ajaxPhonePut({tel:inputphone,code:vercode}, 
            mes=> showToast( mes,2), 
            ()=> setTimeout(()=>this.props.history.goBack(), 1000)
        )
    }

    render(){
        const { flag, phone, inputphone, vercode,disabled, btnContent} = this.state
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
                                    <td width="92"><a className={`codebtn ${disabled&&'disabled'}`} onClick={()=>this.handleGetvercode()} >{btnContent}</a></td>
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