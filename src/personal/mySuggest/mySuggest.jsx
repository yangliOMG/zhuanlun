import React from 'react'
import { TextareaItem, WhiteSpace,  List, Button, Toast, WingBlank } from 'antd-mobile'

import {showToast } from '../../util'
import { withContext } from '../../context'
import {ajaxSuggestPut} from '../../service/asyncFun'

import  "./mySuggest.less"


@withContext
class MyPhone extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:'',
        }
    }

    handleSubmitSuggest(){
        const { value } = this.state
        if(value){
            Toast.loading('加载中...',0)
            ajaxSuggestPut({value},
                mes => showToast( mes,2 ),
                () => setTimeout(()=>{
                        this.props.history.goBack()
                        Toast.hide()
                    }, 500)
            )
        }
    }

    render(){
        return (
            <div>
                <WhiteSpace/>
                <WingBlank size="lg">
                    <List className='suggestArea'>
                        <TextareaItem
                            placeholder='您留下的每一个文字都将有助于我们改善产品，非常期待您的意见反馈！'
                            rows={5}
                            count={100}
                            onChange={(value)=>this.setState({value})}
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