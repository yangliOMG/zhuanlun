import React from 'react'
import {Picker, List, SearchBar} from 'antd-mobile'
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'

import Listview from '../../component/listview/listview.jsx';
// import {update} from '../../redux/user.redux'
@connect(
    state=>state.user,
    // {update}
)
class TempleList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            keyword:'',
            sValue: '',
            data:[
                [
                    {
                        label: '浙江',
                        value: '浙江',
                    },
                    {
                        label: '安徽',
                        value: '安徽',
                    },
                    {
                        label: '上海',
                        value: '上海',
                    },
                ],
                [
                    {
                        label: '禅宗',
                        value: '禅宗',
                    },
                ],
                [
                    {
                        label: '健康',
                        value: '健康',
                    },
                    {
                        label: '智慧',
                        value: '智慧',
                    },
                ],
            ]
        }
    }
    render(){
        return (
            <div>
                <List>
                    <Picker
                        data={this.state.data}
                        title="筛选"
                        cascade={false}
                        value={this.state.sValue}
                        onChange={v => this.setState({ sValue: v })}
                        onOk={v => this.setState({ sValue: v })}
                    >
                        <List.Item arrow="horizontal">地区、宗派、祈愿</List.Item>
                    </Picker>
                </List>
                <SearchBar
                    placeholder="关键字搜索"
                    onChange={v=>this.setState({ keyword: v })}
                />
                <Listview>

                </Listview>
            </div>
        )
    }
}

export default TempleList;