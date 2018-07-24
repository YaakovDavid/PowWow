import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm'
import ChatScreen from './ChatScreen'

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      currentScreen: 'WhatIsYourUsernameScreen',
      currentUsername: ''
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }

  onUsernameSubmitted(username) {
    fetch('https://ykv-chatapp.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username }),
    })
      .then(response => {
        this.setState({
          currentUsername: username,
          currentScreen: 'ChatScreen'
        })
      })
      .catch(error => {
        console.error(error);
      })

  }
  render() {

      if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
        return <div className="app"> <UsernameForm onSubmit={this.onUsernameSubmitted} /> </div>
      } else if (this.state.currentScreen === 'ChatScreen') {
        return <ChatScreen currentUsername={this.state.currentUsername}  />
      }

  }
}

export default App
