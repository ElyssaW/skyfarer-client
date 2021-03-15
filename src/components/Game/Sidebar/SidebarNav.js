import React from 'react'
import { Link } from 'react-router-dom'

const SidebarNav = (props) => {
    return (
        <div>
            <span onClick={()=>{props.changeIndex(0)}}>Chat</span> -
            <span onClick={()=>{props.changeIndex(1)}}>Game</span> - 
            <span onClick={()=>{props.changeIndex(2)}}>Users</span> - 
            <span onClick={()=>{props.changeIndex(3)}}>Ship</span> - 
            <span onClick={()=>{props.changeIndex(4)}}>Characters</span> - 
            <Link to={`/history/${props.gameId}`}>History</Link>
        </div>
    )
}

export default SidebarNav