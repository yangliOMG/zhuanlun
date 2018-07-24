import React from 'react'
import { Tabs } from 'antd-mobile';

import { cengConvert} from '../../util'


class TabEx extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        x1:0,
        x2:0
      }
  }
  touchCount(x,v,idx){
      if(idx===0||idx===7){
        this.setState({[x]:v})
      }
  }
  slideCount(idx){
      if(idx===0||idx===7){
        let changeX = this.state.x2 - this.state.x1
        if(Math.abs(changeX)>30){
            if(changeX > 0 && idx===0) {
                this.props.turnPage(7)
            }else if(changeX < 0 && idx===7){
                this.props.turnPage(0)
            }
        }
      }
  }

  render(){
    
    const data = this.props.data
    const tabs2 = data.map((i,idx)=>({title: idx+1+' Tab', sub: idx+1+''}))
    const tabHeight = document.documentElement.clientHeight -233
    //  <div style={{position:'absolute',top:'-20px',left:'-20px',right:'-20px',bottom:'-20px',background:`url(${require('./tower.png')}) ` }}></div> 
    return (
        <Tabs tabs={tabs2} 
          initialPage={this.props.curPage} page={this.props.curPage}
          onChange={(tab,idx)=>this.props.turnPage(idx)}
          renderTabBar={false}
        >
          {data.map((darr,idx)=>
              <div key={idx} className='lampTab' style={{  minHeight: `${tabHeight}px`}}>
                <div className='rowNum'>
                  {darr.map((arr,idx1)=>
                      <div key={idx1} style={{display:'table-row'}}>{(Array(2).join('0')+cengConvert(idx1,darr.length)).slice(-2)}</div>
                  )}
                </div>
                <div className='lampPannel' 
                      onTouchEnd={()=>this.slideCount(idx)}
                      onTouchStart={e=>this.touchCount('x1',e.targetTouches[0].pageX,idx)}
                     onTouchMove={e=>this.touchCount('x2',e.targetTouches[0].pageX,idx)}
                >
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
