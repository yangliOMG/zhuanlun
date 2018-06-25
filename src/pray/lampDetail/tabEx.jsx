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
    
    const data = this.props.data
    const tabs2 = data.map((i,idx)=>({title: idx+1+' Tab', sub: idx+1+''}))
    const tabHeight = document.documentElement.clientHeight -233
    //  <div style={{position:'absolute',top:'-20px',left:'-20px',right:'-20px',bottom:'-20px',background:`url(${require('./tower.png')}) ` }}></div> 
      return (
        <Tabs tabs={tabs2} 
          initialPage={Number(this.props.curPage)}
          onChange={(tab,idx)=>this.props.turnPage(idx)}
          renderTabBar={false}
        >
          {data.map((darr,idx)=>
              <div key={idx} className='lampTab' style={{  minHeight: `${tabHeight}px`}}>
                <div className='rowNum'>
                  {darr.map((arr,idx1)=>
                      <div key={idx1} style={{display:'table-row'}}>{idx1+1}</div>
                  )}
                </div>
                <div className='lampPannel'>
                  {darr.map((arr,idx1)=>
                      <div key={idx1} style={{display:'table-row'}}>
                        {arr.map((v,idx2)=> <div  key={idx2} style={{display:'table-cell'}}>{v.state!==0?v.state!==1?
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
