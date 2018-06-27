import React from 'react'
import { TextareaItem, WhiteSpace,  List, Button, Toast, WingBlank } from 'antd-mobile'
import {connect} from 'react-redux'

import {showToast } from '../../util'

import User from '../../service/user-service.jsx'
import  "./mySuggest.less"

const _user = new User()
@connect(
    state=>state.user,
)
class MyPhone extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:'',
        }
    }

    handleSubmitSuggest(){
        Toast.loading('加载中...',0)
        _user.submitSuggest(this.state.value).then(data=>{
            if(data.status===1){
                showToast('提交成功！')
                setTimeout(()=>this.props.history.goBack(), 500)
            }else{
                showToast(data.result)
            }
            Toast.hide()
        })
    }
    handleChange(value){
        this.setState({value})
    }

    render(){
        return (
            <div>
                <WhiteSpace/>
                <WingBlank size="sm">
                    <List>
                        <TextareaItem
                            placeholder='我的意见是...'
                            rows={5}
                            count={100}
                            onChange={(val)=>this.handleChange(val)}
                        />
                    </List>
                    <WhiteSpace/>
                    <Button type="warning" className="orangeBtn"
                        onClick={()=>this.handleSubmitSuggest()}
                        >确认</Button>
                </WingBlank>
            </div>
        )
    }
}

export default MyPhone;