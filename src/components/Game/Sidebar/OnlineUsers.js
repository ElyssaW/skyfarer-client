import React from 'react'
import { useRouteMatch } from 'react-router'

const OnlineUsers = (props) => {

    console.log('Creating online user list')
    let usersList = []
    for (const userId in props.onlineUsers) {
        let user = props.onlineUsers[userId]
        console.log(user)
        console.log(props.playerCharacters)
        console.log(props.playerCharacters[user.playingAs])

        if (props.playerCharacters[user.playingAs]) {
            usersList.push(<p>{props.onlineUsers[userId].username} is online (Playing {props.playerCharacters[user.playingAs].name})</p>)
        } else {
            usersList.push(<p>{props.onlineUsers[userId].username} is online</p>)
        }
    }

    return (
        <div>
            <p>Online Users</p>
            {usersList} 
        </div>
    )
}

export default OnlineUsers