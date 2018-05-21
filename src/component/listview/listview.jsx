import React from 'react'
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router-dom'
import { ListView, } from 'antd-mobile';

function MyBody(props) {
    return (
        <div className="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}

const data = [
    {
        img: 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=e599da6bbea1cd1111bb7a72d87ba399/a8ec8a13632762d0ea469ae4a4ec08fa513dc674.jpg',
        title:'灵隐寺',
        id:'qwer',
        des: '灵隐寺始建于东晋咸和元年(公元326年),至今已有约一千七百年的历史,为杭州最早的名刹.地处杭州西湖以西,背靠北高峰,面朝飞来峰,两峰挟峙,林木耸秀,深山古寺',
    },
    {
        img: 'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=2a3a95b637adcbef15397654cdc645b8/3b292df5e0fe992546a9c52232a85edf8db1711f.jpg',
        title:'望丛祠',
        id:'1234',
        des: '望丛祠，位于四川省成都市郫都区西南部，距成都市区23千米。是为了纪念最早的蜀王望帝杜宇和他的继任人丛帝而修建的祀祠，也是中国西南地区唯一的一祠祭二主、凭吊蜀人先贤的最.',
    },
    {
        img: 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=ca982dd0212dd42a4b0409f9625230d0/96dda144ad345982af059d2b08f431adcaef84ff.jpg',
        title:'南普陀寺',
        id:'asdf',
        des: '南普陀寺位于福建省厦门市东南五老峰下，面临碧澄海港，该寺占地面积25.8万平方米，建筑面积2.1270万平方米。始建于唐朝末年，称为泗洲寺，宋治平年间改名为普照寺，明朝初年，寺院荒芜，直到清朝康熙年间才得到重建。因其供奉观世音菩萨，与浙江普陀山观音道场类似，又在普陀山以南而得名“南普陀寺”，为闽南佛教胜地之一。 [1-2]  寺内明万历年间血书《妙法莲华经》和何朝宗名作白瓷观音等最为名',
    },
];
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {
    for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        sectionIDs.push(sectionName);
        dataBlobs[sectionName] = sectionName;
        rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
            const rowName = `S${ii}, R${jj}`;
            rowIDs[ii].push(rowName);
            dataBlobs[rowName] = rowName;
        }
    }
    sectionIDs = [...sectionIDs];
    rowIDs = [...rowIDs];
}

@withRouter
class Listview extends React.Component {
    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight * 3 / 4,
        };
    }

    componentWillMount(){
        sectionIDs = [];
        rowIDs = [];
    }

    componentDidMount() {
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);

        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        // simulate initial Ajax
        setTimeout(() => {
            genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
                height: hei,
            });
        }, 600);
    }

    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
    //     });
    //   }
    // }

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            genData(++pageIndex);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
            });
        }, 1000);
    }

    handleClick(id){
        this.props.history.push(`/temple/${id}`)
    }

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (
                <div key={rowID} style={{ padding: '0 15px' }} onClick={()=>this.handleClick(obj.id)}>
                    <div style={{  display: 'flex', padding: '15px 0' }}>
                        <img style={{ height: '120px', marginRight: '15px' }} src={obj.img} alt="" />
                        <div style={{ lineHeight: 1 }}>
                            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.title}</div>
                            <div className="text-overflow6">{obj.des}</div>
                            <div><span>288</span><span style={{ marginLeft: 20 }}>288</span></div>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderBodyComponent={() => <MyBody />}
                renderRow={row}
                renderSeparator={separator}
                style={{
                    height: this.state.height,
                    overflow: 'auto',
                }}
                pageSize={4}
                // onScroll={() => { console.log('scroll'); }}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }
}

export default Listview;

