import React from 'react'
import './prayNavbar.css'

class PrayNavbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    marqueeInterval = ''

    componentDidUpdate(){
        let $0 = document.getElementById("marqueeBox")
        if( $0.scrollWidth > ($0.offsetWidth+100) && this.marqueeInterval ===''){
            this.marqueeInterval=setInterval(()=>{
                $0.scrollLeft ++
                if($0.scrollLeft === $0.scrollWidth-$0.offsetWidth){ 
                    $0.scrollLeft =0
                } 
            },40)
        }
    }
    componentWillUnmount(){
        clearInterval(this.marqueeInterval)
    }

    render(){
        const  {navList} = this.props
        return (
                <div className="am-notice-bar">
                    <div id="marqueeBox" className="am-notice-board">
                        {
                            navList.map((v,idx)=>
                                <span key={idx} className='ml-10 mr-10'><span className='c-black'>{v.prayman}</span>供灯{v.lednums}盏</span>
                            )
                        }
                    </div>
                </div>
        )
    }
}

export default PrayNavbar
