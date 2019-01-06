import React from 'react'
import PrayNavbar from './prayNavbar'

const HOC = () =>
class extends React.Component {
    render() {
      const { navList, descColor, namecColor} = this.props
      return <PrayNavbar data={navList} {...{descColor, namecColor}} />;
    }
}

export default HOC();