import React from 'react'
import { WhiteSpace  , SearchBar, WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'

import {getTemplate} from '../../redux/order.redux'
import './template.css'

@connect(
    state=>state.user,
    {getTemplate}
)
class Template extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            keyword:'',
            type:''
        }
    }

    handleChoose(type){
        this.setState({
            type
        })
    }
    handleChange(num){
        this.setState({
            num,
            total: ((this.state.price[this.state.chooseBtn]||0)* num).toFixed(2)
        })
    }
    handleClick(e){
        this.props.getTemplate(e.target.innerHTML)
        this.props.history.goBack()
    }
    render(){
        const typeList = [{type:'1',name:'福寿'},{type:'2',name:'福禄'},{type:'3',name:'健康'},
                        {type:'4',name:'财富'},{type:'5',name:'姻缘'},{type:'6',name:'考试'}]
        const templateList = [{id:'1',text:'美满家庭，鸾凤和鸣'},{id:'2',text:'大吉大利，晚上吃鸡'},{id:'3',text:'年年今日,岁岁今朝'},
                            {id:'4',text:'百事可乐,万事芬达'},{id:'5',text:'愿与同僚,共分此乐'},{id:'6',text:'早生贵子，丁财两旺'}]                
        return (
            <div>
                <SearchBar
                    placeholder="关键字搜索"
                    onChange={v=>this.setState({ keyword: v })}
                />
                <WingBlank size="lg">
                    <div className="board">
                        {typeList.map((v,idx)=>
                            <div style={{flex: '1 1',color: `${this.state.type===v.name?'red':''}` }} 
                                onClick={()=>this.handleChoose(v.name)}
                                key={v.type}>{v.name}</div>
                        )}
                    </div>
                </WingBlank>
                <WhiteSpace size="sm" />
                <WingBlank size="sm">
                    {templateList.map((v,idx)=>
                        <a className="row" key={v.id}
                            onClick={(e)=>this.handleClick(e)}
                        >{v.text}</a>
                    )}
                </WingBlank>

            </div>
        )
    }
}

export default Template;