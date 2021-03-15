import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import CharacterWindow from '../../Character/CharacterWindow'
import OnlineUsers from './OnlineUsers'
import PlayerCharacters from './PlayerCharacters'

const RightSidebar = (props) => {

    const [sidebarIndex, setSidebarIndex] = useState(0)
    const [sidebarDisplay, setSidebarDisplay] = useState(null)
    const [updating, setUpdating] = useState('')

    let sidebar
    switch (sidebarIndex) {
        case 2:
            sidebar = (
                <div>
                    <p>Game</p>
                    <p>Ship</p>
                    <p>Online</p>
                    < OnlineUsers
                        onlineUsers={props.onlineUsers} 
                        playerCharacters={props.playerCharacters}
                        setSidebarDisplay={setSidebarDisplay}
                        setSidebarIndex={setSidebarIndex}
                        setUpdating={setUpdating}
                    />
                </div>
                )
            break;
        case 6:
            sidebar = (
                < CharacterWindow 
                    character={sidebarDisplay}
                />
            )
            break;
        case 4:
            sidebar = (
                < PlayerCharacters 
                    playerCharacters={props.playerCharacters}
                    onlineUsers={props.onlineUsers}
                />
            )
            break;
        default:
            sidebar = (
                <div>
                    Right sidebar
                </div>
            )
            break;
    }

    const changeIndex = (i) => {
        setSidebarIndex(i)
    }

    return (
        <>
            {sidebar}
            <p>
                Game - 
                <span onClick={()=>{changeIndex(2)}}>Users</span> - 
                Ship - 
                <span onClick={()=>{changeIndex(4)}}>Characters</span> - 
                <Link to={`/history/${props.gameState._id}`}>History</Link>
            </p>
        </>
    )
}

export default RightSidebar