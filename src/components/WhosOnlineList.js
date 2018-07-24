import React from 'react'

class WhosOnlineList extends React.Component{
  render(){
    if(this.props.users){
      return (
        <div className="whos-in-chat">


        <ul>
          <h3>👥 Members:</h3>
          {this.props.users.map((user,index) => {
              // ({ user.presence.state })
              console.log(user, "ussssserrrrs");

            return <li>{user} </li>
          })}
        </ul>
        </div>
      )
    }else{
      return <p>Loading...</p>
    }
  }
}

export default WhosOnlineList
