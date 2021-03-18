import React from 'react'
import { Link } from 'react-router-dom'

const SidebarNav = (props) => {
    return (
        <div className={props.className}>
            <span onClick={()=>{props.setCollapsed(false) 
                                props.changeIndex(0)}}>Chat</span>

            <span onClick={()=>{props.setCollapsed(false)
                                props.changeIndex(1)}}> Game</span> 

            <span onClick={()=>{props.setCollapsed(false)
                                props.changeIndex(2)}}> Online</span> 

            <span onClick={()=>{props.setCollapsed(false)
                                props.changeIndex(3)}}> Ship</span>  

            <span onClick={()=>{props.setCollapsed(!props.collapsed)}}> 
                { props.collapsed ? 'Open' : 'Close' }
            </span>
        </div>
    )
}

export default SidebarNav