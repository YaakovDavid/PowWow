import React from 'react'

class RoomList extends React.Component {
  render() {
    const orderedRooms = [...this.props.rooms].sort((a, b) => a.id > b.id)
    return (
      <div className="room-list">

        <ul>
          <h3>💬 Rooms:</h3>
          {orderedRooms.map(room => {
            const active = room.id === this.props.roomId ? 'active' : '';
            return (
              <li key={room.id} className={"room " + active}>
                <a
                 onClick={() => this.props.subscribeToRoom(room.id)}
                  href="#"
                  className="change-room-color">
                  # {room.name}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default RoomList
