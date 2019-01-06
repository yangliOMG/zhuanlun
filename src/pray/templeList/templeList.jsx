import React from 'react'
import {
    // Picker, List, 
    SearchBar} from 'antd-mobile'
import {connect} from 'react-redux'

import Listview from '../../component/listview/pullRefresh.jsx';
import { TO_GET_TEMPLELIST, SAVEANCHOR } from '../../constant/actionType'

import './templeList.less'

@connect( ({praydata})=>praydata,
    dispatch => ({
        getTempleList: (payload,callback) => dispatch({type: TO_GET_TEMPLELIST, payload,callback}),
        saveAnchor: (payload) => dispatch({type: SAVEANCHOR, payload}),
    })
)
class TempleList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pickerVal:'',
        }
    }
    componentDidMount(){
        const { templeList,index, getTempleList} = this.props
        const { pickerVal} = this.state
        if(templeList.length===0){
            getTempleList({index, pickerVal})
        }
    }
    handlePicker(v){
        const [province,tag] = v
        this.setState({
            pickerVal : v.join('，')
        })
        this.props.getTempleList({province,tag,index:1})
    }
    render(){
        // let pickerOpt = [
        //     [
        //         {label: '浙江',value: '浙江',},
        //         {label: '安徽',value: '安徽',},
        //         {label: '上海',value: '上海',},
        //     ],
        //     [
        //         {label: '健康',value: '健康',},
        //         {label: '智慧',value: '智慧',},
        //         {label: '求财',value: '求财',},
        //         {label: '求子',value: '求子',},
        //         {label: '事业',value: '事业',},
        //     ],
        // ]
        const {getTempleList,saveAnchor, templeList, index} = this.props
        return (
            <div>
                {/* <List>
                    <Picker
                        data={pickerOpt}
                        title="筛选"
                        cascade={false}
                        value={this.state.sValue}
                        onOk={v => this.handlePicker(v)}
                    >
                        <List.Item arrow="horizontal">{this.state.pickerVal||'地区、祈愿'}</List.Item>
                    </Picker>
                </List> */}
                <SearchBar
                    placeholder="关键字搜索"
                    onChange={v=> getTempleList({name:v,index:1})}
                />
                <Listview templeData={templeList} 
                    saveAnchor={ (val)=>saveAnchor(val)}
                    getMore={(callback)=> getTempleList({index,scrollMore:true},callback)}>

                </Listview>
            </div>
        )
    }
}

export default TempleList;