import React from 'react'
import { SearchBar} from 'antd-mobile'

import { withContext } from '../../context'
import {ajaxTempleList} from '../../service/asyncFun'
import Listview from '../../component/listview/pullRefresh.jsx';
import './templeList.less'

@withContext
class TempleList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pickerVal:'',
        }
    }
    componentDidMount(){
        let { list, index } = this.props.context.templeList
        const { pickerVal} = this.state
        if( list.length === 0 ){
            this.saveList({index, pickerVal})
        }
    }
    saveList(payload,callback){
        let { save, templeList } = this.props.context

        ajaxTempleList(payload,(list,index)=>{
            templeList.list = list
            templeList.index = index
            save({templeList})
        },callback)
    }
    saveAnchor(anchor){
        let { save, templeList } = this.props.context
        templeList.anchor = anchor
        save({templeList})
        console.log(this.props.context)
    }
    
    render(){
        let { list, index } = this.props.context.templeList
        return (
            <div>
                <SearchBar
                    placeholder="关键字搜索"
                    onChange={v=>this.saveList({name:v,index:1})}
                />
                <Listview templeData={list} 
                    saveAnchor={ (val)=>this.saveAnchor(val)}
                    getMore={(callback)=>this.saveList({index,scrollMore:true},callback)}>

                </Listview>
            </div>
        )
    }
}

export default TempleList;