import React from 'react'
import ReactDOM from 'react-dom'
import {withRouter} from 'react-router-dom'
import { PullToRefresh } from 'antd-mobile';


function genData() {
    const dataArr = [];
    for (let i = 0; i < 20; i++) {
      dataArr.push(i);
    }
    return dataArr;
  }

@withRouter
class Listview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          refreshing: false,
          height: document.documentElement.clientHeight,
          data: [],
        };
    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        setTimeout(() => this.setState({
            height: hei,
            data: genData(),
        }), 0);
    }

    onRefresh = () => {
        this.setState({ refreshing: true, isLoading: true });
        this.props.getMore().then(res=>{
            this.rData = genData()
            this.setState({
                data: genData(),
                refreshing: false,
                isLoading: false,
            });
        })
    };
    handleClick(id){
        this.props.history.push(`/temple#${id}`)
    }

    render() {
        return (
            <div>
                <PullToRefresh
                    ref={el => this.ptr = el}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    indicator='上拉可以刷新'
                    direction='up'
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                >
                    {this.props.templeData.map((obj,idx) => (
                        <div key={obj.id} style={{ padding: '0 15px',borderBottom: '10px solid #efeff4',background:'#fff' }} onClick={()=>this.handleClick(obj.id)}>
                            <div style={{  display: 'flex', padding: '15px 0' }}>
                                <img style={{ height: '120px', marginRight: '15px' }} src={obj.ico} alt="" />
                                <div style={{ lineHeight: 1 }}>
                                    <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.name}</div>
                                    <div className="text-overflow6">{obj.tag}</div>
                                    <div>
                                        <span>{obj.sect}</span>
                                        <span style={{ marginLeft: 20 }}>{obj.province}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </PullToRefresh>
            </div>);
        }

}

export default Listview;

