import React from 'react'
import ReactDOM from 'react-dom'
import {withRouter} from 'react-router-dom'
import { PullToRefresh } from 'antd-mobile';

import './style.less'

@withRouter
class Listview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            height: typeof document !== 'undefined' ? document.documentElement.clientHeight : 300 ,
        };
    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        setTimeout(() => this.setState({
            height: hei,
        }), 0);
    }

    onRefresh = () => {
        this.setState({ refreshing: true, isLoading: true });
        this.props.getMore( () => this.setState({
            refreshing: false,
            isLoading: false,
        }))
        
    };
    handleClick(id){
        this.props.saveAnchor(`#${id}`)
        this.props.history.push(`/temple#${id}`)
    }

    render() {
        const { height,refreshing} = this.state
        const { templeData } = this.props
        return (
            <div>
                <PullToRefresh
                    ref={el => this.ptr = el}
                    style={{
                        height: height,
                        overflow: 'auto',
                    }}
                    indicator='上拉可以刷新'
                    direction='up'
                    refreshing={refreshing}
                    onRefresh={this.onRefresh}
                >
                    { templeData.map((obj,idx) => (
                        <div id={obj.id} key={obj.id} className='line_box'
                            onClick={()=>this.handleClick(obj.id)}
                        >
                            <div className='img_box'>
                                <img className='img' src={obj.ico} alt="" />
                            </div>
                            <div className='text_box'>
                                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.name}</div>
                                <div className="text-overflow6"></div>
                                <div>
                                    <span>{obj.sect}</span>
                                    <span style={{ marginLeft: 20 }}>{obj.province}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </PullToRefresh>
            </div>);
        }

}

export default Listview;

