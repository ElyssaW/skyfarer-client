import React from 'react'
import { useRouteMatch } from 'react-router'

const OnlineUsers = (props) => {

    console.log('Creating online user list')
    let usersList = []
    for (const userId in props.onlineUsers) {
        let user = props.onlineUsers[userId]

        let isGm = userId === props.gameState.gm ? ' (GM) ' : null

        if (props.playerCharacters[user.playingAs]) {
            usersList.push(<p>{props.onlineUsers[userId].username} {isGm} is online (Playing <span onClick={() => {
                console.log('Setting sidebar...')
                console.log(props.playerCharacters[user.playingAs])
                props.setSidebarIndex(6)
                props.setSidebarDisplay(props.playerCharacters[user.playingAs])
                props.setUpdating('Updating...')
            }}>{props.playerCharacters[user.playingAs].name})</span></p>)
        } else {
            usersList.push(<p>{props.onlineUsers[userId].username} is online</p>)
        }
    }

    return (
        <div>
            <h2 className='character-window-title'>Users</h2>
            <h4 className='subtitle sidebar-subtitle-left clipped-left'>Online</h4>
            <div className='sidebar-subsection-left'>
                {usersList} 
            </div>
        </div>
    )
}

export default OnlineUsers