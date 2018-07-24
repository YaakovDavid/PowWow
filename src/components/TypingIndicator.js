import React from 'react'

class TypingIndicator extends React.Component{
  render(){
    if(this.props.usersWhoAreTyping.length === 0){
      return <div className="typing-indicator"> </div>

    } else if (this.props.usersWhoAreTyping.length === 1){
      return <p className="typing-indicator"> ✏️ {this.props.usersWhoAreTyping[0]} is typing ...</p>

    } else if (this.props.usersWhoAreTyping.length > 1){
      return<p className="typing-indicator"> ✏️ {this.props.usersWhoAreTyping.join(' and ')} are typing ...</p>
    }
  }
}

export default TypingIndicator
