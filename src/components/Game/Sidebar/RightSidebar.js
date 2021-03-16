import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Col } from 'react-bootstrap'
import SidebarNav from './SidebarNav'
import CharacterWindow from '../../Character/CharacterWindow'
import OnlineUsers from './OnlineUsers'
import PlayerCharacters from './PlayerCharacters'
import ChatCommands from './ChatCommands'
import ShipInfo from './ShipInfo'
import GameInfo from './GameInfo'

const RightSidebar = (props) => {

    const [sidebarIndex, setSidebarIndex] = useState(0)
    const [sidebarDisplay, setSidebarDisplay] = useState(null)
    const [collapsed, setCollapsed] = useState(false)
    const [updating, setUpdating] = useState('')

    const changeIndex = (i) => {
        setSidebarIndex(i)
    }

    let sidebar
    switch (sidebarIndex) {
        case 0:
            sidebar = (
                <ChatCommands/>
            )
            break;
        case 1:
            sidebar = (
                <>
                <GameInfo
                    gameState={props.gameState}
                />
                </>
            )
            break;
        case 2:
            sidebar = (
                <>
                    < OnlineUsers
                        onlineUsers={props.onlineUsers} 
                        playerCharacters={props.playerCharacters}
                        setSidebarDisplay={setSidebarDisplay}
                        setSidebarIndex={setSidebarIndex}
                        setUpdating={setUpdating}
                        gameState={props.gameState}
                    />
                </>
                )
            break;
        case 3:
            sidebar = (
                <ShipInfo/>
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
        case 6:
            sidebar = (
                < CharacterWindow 
                    character={sidebarDisplay}
                />
            )
            break;
    }

    let sidebarColumn = collapsed ? (
        < Col className='col-1 character-sidebar-collapsed'>
            < SidebarNav
                changeIndex={changeIndex}
                gameId={props.gameState._id}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                className={'sidebar-nav-collapsed'}
            />
        </ Col >
    ) : (
        <>
        < Col className='col-3 character-sidebar'>
            {sidebar}
            < SidebarNav
                changeIndex={changeIndex}
                gameId={props.gameState._id}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                className={'sidebar-nav'}
            />
        </ Col >
        </>
    )

    return (
        <>
            {sidebarColumn}
        </>
    )
}

export default RightSidebar