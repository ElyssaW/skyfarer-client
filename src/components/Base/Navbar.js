import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Navbar = (props) => {

    return (
        <div className='nav-bar'>
            <NavLink className="nav-link" exact to="/"> Home </NavLink>
            <NavLink className="nav-link" exact to="/games/all">All Games</NavLink>

            { 
            props.currentUser ? 
            <>
                <NavLink className="nav-link" exact to="/auth/myprofile">{props.currentUser.name}</NavLink>
                <NavLink className="nav-link" exact to="/" onClick={props.handleLogout}>Logout</NavLink>
            </> :
            <>
                <NavLink className="nav-link" exact to="/auth/login"> Login </NavLink>
                <NavLink className="nav-link" exact to="/auth/signup">Signup </NavLink>
            </>
            }
        </div>
    )
}

export default Navbar