import React from 'react'

class MessageList extends React.Component{
  render(){
    return(
      <div className="message-list">

        {this.props.messages.map((message, index) => (

          <div key={index}>

            <div className="sender">
              {message.senderId}
            </div>
            <div>
              <div className="message">
              {message.text}
            </div>
            </div>

          </div>
        ))}

        {}
      </div>

    )}
}

export default MessageList
