// require('dotenv').config({ path: './components/src/.env' })
import React from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import TypingIndicator from './components/TypingIndicator'
import WhosOnlineList from './components/WhosOnlineList'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'
import Emoji from './components/Emoji'
import Online from './components/Online'


//import { tokenUrl, instanceLocator } from './config'

class ChatScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      currentUser: {},
      usersWhoAreTyping: [],
      roomId: 11790538,
      joinableRooms: [],
      joinedRooms: [],
      users: [],
      online: {},
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.sendTypingEvent = this.sendTypingEvent.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:22d5129b-7ba0-4b4c-a2b8-2c6b4ca79368',
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        //this token is for programming and has to get changed later
        url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/22d5129b-7ba0-4b4c-a2b8-2c6b4ca79368/token',
      }),
    })
    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser

        this.getRooms()
      })
      .catch(err => console.log('error on connecting: ', err))
  }

  getRooms() {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
      })
      .catch(err => console.log('error on joinableRooms: ', err))
  }

  subscribeToRoom(roomId) {
    this.setState({ messages: [] })
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      messageLimit: 100,
      hooks: {
        onNewMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        },
        onUserStartedTyping: user => {
          this.setState({
            usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
          })
        },
        onUserStoppedTyping: user => {
          this.setState({
            usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
              username => username !== user.name
            )
          })
        },
        onUserCameOnline: () => this.forceUpdate(),
        onUserWentOffline: () => this.forceUpdate(),
        onUserJoined: () => this.forceUpdate()
      }
    })

      .then(room => {
        console.log("this is room", room.userStore.presenceStore.store);

        this.setState({
          roomId: room.id,
          users: room.userIds,
          online: room.userStore.presenceStore.store,
        })
        console.log(this.state.online, " online property ");

        this.getRooms()
      })
      .catch(err => console.log('error on subscribing to room: ', err))
  }

  sendMessage(text) {
    return this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    })
  }

  createRoom(name) {
    this.currentUser.createRoom({
      name
    })
      .then(room => {
        this.subscribeToRoom(room.id)
      })
      .catch(err => console.log('error with createRoom: ', err))
  }


  sendTypingEvent() {
    this.currentUser.isTypingIn({
      roomId: this.state.roomId

    })

      .catch(error => console.error('error', error))
  }


  render() {
    return (
      <div className="chat-screen">

        <WhosOnlineList users={this.state.users} />

        <RoomList
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
          roomId={this.state.roomId}/>

        <NewRoomForm createRoom={this.createRoom} />

        <MessageList messages={this.state.messages} />

        <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />

        <SendMessageForm
          onSubmit={this.sendMessage}
          onChange={this.sendTypingEvent}/>

        <Emoji />
        <Online online={this.state.online} users={this.state.users}/>
      </div>
    )
  }
}

export default ChatScreen
