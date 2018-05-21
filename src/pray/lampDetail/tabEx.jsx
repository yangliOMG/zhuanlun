import React from 'react'
import FontAwesome from 'react-fontawesome';
import { Tabs } from 'antd-mobile';

class TabEx extends React.Component{
  constructor(props){
      super(props);
      this.state = {
      }
  }


  render(){
    
    const tabs2 = [
      { title: '1 Tab', sub: '1' },
      { title: '2 Tab', sub: '2' },
      { title: '3 Tab', sub: '3' },
    ];
    const tabHeight = document.documentElement.clientHeight -233
    //  <div style={{position:'absolute',top:'-20px',left:'-20px',right:'-20px',bottom:'-20px',background:`url(${require('./tower.png')}) ` }}></div> 
    const data = this.props.data
      return (
        <Tabs tabs={tabs2}
          initialPage={0}
          tabBarPosition="bottom"
          onChange={(tab,idx)=>this.props.turnPage(idx)}
          renderTab={tab => <span>{tab.title}</span>}
        >
          {data.map((darr,idx)=>
              <div key={idx} style={{  minHeight: `${tabHeight}px`, height:'100%',padding:'10px 0 0 20px', fontSize:'22px' }}>
                <div style={{display:'table',  height: '100%', width: '100%', lineHeight:'1', textAlign:'center', position:'relative' }}>
                  {darr.map((arr,idx1)=>
                    <div key={idx1} style={{display:'table-row'}}>
                      {arr.map((v,idx2)=> <div  key={idx2} style={{display:'table-cell'}}>{v!==0?v!==1?
                          <FontAwesome name={'check-square'} style={{color:'#4dbe4e'}} onClick={()=>this.props.seatSelection(idx,idx1,idx2)} />:
                          <FontAwesome name={'dot-circle-o'} style={{color:'#aaa' }} />:
                          <FontAwesome name={'square-o'} style={{}} onClick={()=>this.props.seatSelection(idx,idx1,idx2)} />
                          }</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
          )}


      </Tabs>
      )
    }
}
export default TabEx;
