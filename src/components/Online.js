import React from 'react'
import ChatScreen from '../ChatScreen'

class Online extends React.Component {

  render() {
    console.log(this.props.online, "online from online component");

    for (let i in this.props.online) {
      console.log(this.props.online[i]);

      if (this.props.online[i].state === 'online') {
          //console.log(i, "is online");
        return <div className="online"> {i} is online </div>
      }
    }
    return null
  }
}

export default Online
