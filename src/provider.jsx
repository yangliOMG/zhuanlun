import React from 'react'
import { Provider} from './context';

const order = {
    id:'',
    num:1,
    duration:1,
    blessing:'',
    position:[],
}
const templeList = {
    list:[],
    index:1,
    anchor:""
}
const prayList = {
    list:[],
}
const user = {
    id:'',
    openid:'',
    nick:'',
    headImgURL:''
}
class Provide extends React.Component{
    constructor(props){
        super(props)
        
        this.state = { 
            ...JSON.parse(JSON.stringify({order, templeList, prayList, user,})),
            save: this.save,
            saveOrder: this.saveOrder,
            init: this.init
        }
    }
    saveOrder = (value) => {
        this.setState({
            order:{ ...this.state.order, ...value}
        })
    }
    save = (value) => {
        this.setState(value)
    }
    init = (key) => {
        this.setState({ [key]: JSON.parse(JSON.stringify({order, templeList, prayList, user,}))[key]})
    }
    render(){
        return <Provider value={this.state}>{this.props.children}</Provider>
    }
}

export default Provide