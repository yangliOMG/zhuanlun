import React from 'react'
import {Picker, List, SearchBar} from 'antd-mobile'
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'

import Listview from '../../component/listview/pullRefresh.jsx';
import Temple from '../../service/temple-service.jsx'

const _temple = new Temple()

// import {update} from '../../redux/user.redux'
@connect(
    state=>state.user,
    // {update}
)
class TempleList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pickerVal:'',
            index:1,
            pickerOpt:[
                [
                    {label: '浙江',value: '浙江',},
                    {label: '安徽',value: '安徽',},
                    {label: '上海',value: '上海',},
                ],
                [
                    {label: '佛教',value: '佛教',},
                ],
                [
                    {label: '健康',value: '健康',},
                    {label: '智慧',value: '智慧',},
                    {label: '求财',value: '求财',},
                    {label: '求子',value: '求子',},
                    {label: '事业',value: '事业',},
                ],
            ],
            templeList:[]
        }
    }
    componentDidMount(){
        this.ajaxTempleList({index:this.state.index})
    }
    async ajaxTempleList({province='',sect='',tag='',name='',index},scrollMore=false){
        let res 
        if(name !== ''){
            res = await  _temple.getTempleListByName(name,index)
        }else if(province !== ''&&sect !== ''&&tag !== ''){
            res = await  _temple.getTempleListByPicker(province,sect,tag,index)
        }else if(this.state.pickerVal!==''){
            const arr = this.state.pickerVal.split('，')
            res = await  _temple.getTempleListByPicker(...arr,index)
        }else{
            res = await  _temple.getTempleListAll(index)
        }
        
        if(res.status === 200){
            if( !scrollMore || res.data.length>this.state.templeList.length){
                this.setState({
                    templeList: res.data,
                    index : ++index
                })
                return true
            }else{
                return false
            }
        }
    }
    handlePicker(v){
        const [province,sect,tag] = v
        this.setState({
            pickerVal : v.join('，')
        })
        this.ajaxTempleList({province,sect,tag,index:1})
    }
    handleSearchBar(v){
        this.ajaxTempleList({name:v,index:1})
    }
    render(){
        return (
            <div>
                <List>
                    <Picker
                        data={this.state.pickerOpt}
                        title="筛选"
                        cascade={false}
                        value={this.state.sValue}
                        onOk={v => this.handlePicker(v)}
                    >
                        <List.Item arrow="horizontal">{this.state.pickerVal||'地区、宗派、祈愿'}</List.Item>
                    </Picker>
                </List>
                <SearchBar
                    placeholder="关键字搜索"
                    onChange={v=>this.handleSearchBar( v )}
                />
                <Listview templeData={this.state.templeList} getMore={()=>this.ajaxTempleList({index:this.state.index},true)}>

                </Listview>
            </div>
        )
    }
}

export default TempleList;