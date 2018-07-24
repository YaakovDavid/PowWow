import React from 'react'

class NewRoomForm extends React.Component {

  constructor() {
    super()
    this.state = {
      roomName: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({
      roomName: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.createRoom(this.state.roomName)
    this.setState({ roomName: '' })
  }

  render() {
    return (
      <div className="new-room-form">
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.roomName}
            onChange={this.onChange}
            type="text"
            placeholder="Create New Room ✏️"
            required />
        </form>
      </div>
    )
  }
}

export default NewRoomForm
