import React, { Component } from 'react'

class UsernameForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
    }
    console.log(this.state.username);
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(e) {
    this.setState({
      username: e.target.value,
    })
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.username)
    // I think I should be able to insert the name into a database
    console.log(this.state.username);
  }

  render() {
    return (
      <div>
      <div>
          <h1>Welcome to Chatapp</h1>
       </div>
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            className="app-input"
            type="text"
            placeholder="Write your name and hit enter"
            onChange={this.onChange}
            required
          />
          <br />

            <input type="submit" className="ubmit-main-page" />
        </form>
      </div>
     </div>
    )
  }
}



export default UsernameForm
