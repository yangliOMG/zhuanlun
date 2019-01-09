import React from 'react'
import {showToast, countDown } from '../../util'

class VercodeBtn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            disabled:false,
            btnContent:'获取验证码'
        }
    }
    
    breakFlag = false

    handleGetvercode(){
        const { disabled } = this.state
        if( disabled )
            return true;
        let phone = this.props.inputphone
        let preg = /^(((13[0-9]{1})|(15[0-35-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; //匹配手机号
        if( phone==='' || !preg.test(phone)){
            return showToast('请输入正确格式的电话号码')
        }else{
            countDown(60, 
                () => this.breakFlag,
                val=> this.setState({ disabled:true, btnContent: val+'秒后重试' }), 
                () => {
                    this.setState({ disabled:false, btnContent:'获取验证码' })
                    this.breakFlag = false
                }
            )
            this.props.sendVerCode( {phone}, 
                mes=> showToast( mes,2),
                () => this.breakFlag = true
            )
        }
    }

    render(){
        const { disabled, btnContent} = this.state
        const { className} = this.props
        return (
            <a className={`${className} ${disabled&&'disabled'}`} onClick={()=>this.handleGetvercode()} >{btnContent}</a>
        )
    }
}

export default VercodeBtn;