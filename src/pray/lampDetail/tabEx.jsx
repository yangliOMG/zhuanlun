import React from 'react'
import { Tabs } from 'antd-mobile';

import { cengConvert} from '../../util'


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
                      <div key={idx1} style={{display:'table-row'}}>{cengConvert(idx1,darr.length)}</div>
                  )}
                </div>
                <div className='lampPannel'>
                  {darr.map((arr,idx1)=>
                      <div key={idx1} style={{display:'table-row'}}>
                        {arr.map((v,idx2)=> <div key={idx2} style={{display:'table-cell'}}>{v.state!==0?v.state!==1?
                            <span className={`lampIcon l-red mini`} onClick={()=>this.props.seatSelection(idx,idx1,idx2)}></span>:
                            <span className={`lampIcon l-gong-mini mini`}></span>:
                            <span className={`lampIcon l-grey mini`} onClick={()=>this.props.seatSelection(idx,idx1,idx2)}></span>
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
