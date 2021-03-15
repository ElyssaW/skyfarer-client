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
            usersList.push(<p>{props.onlineUsers[userId].username} is online (Playing <span onClick={() => {
                console.log('Setting sidebar...')
                console.log(props.playerCharacters[user.playingAs])
                props.setSidebarIndex(1)
                props.setSidebarDisplay(props.playerCharacters[user.playingAs])
                props.setUpdating('Updating...')
            }}>{props.playerCharacters[user.playingAs].name})</span></p>)
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