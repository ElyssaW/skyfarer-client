import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Navbar = (props) => {

    return (
        <div>
            <NavLink className="nav-link" exact to="/"> Home | </NavLink>
            <NavLink className="nav-link" exact to="/character/view/:id">Character | </NavLink>
            <NavLink className="nav-link" exact to="/game/:id">My Games</NavLink>
            <NavLink className="nav-link" exact to="/game/all">All Games</NavLink>

            { 
            props.currentUser ? 
            <>
                <NavLink className="nav-link" exact to="/auth/myprofile">{props.currentUser.name}</NavLink>
                < button onClick={props.handleLogout} >Logout</button>
            </> :
            <>
                <NavLink className="nav-link" exact to="/auth/login"> Login | </NavLink>
                <NavLink className="nav-link" exact to="/auth/signup">Signup | </NavLink>
            </>
            }
        </div>
    )
}

export default Navbar