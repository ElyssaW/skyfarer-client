import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <div>
            <NavLink className="nav-link" exact to="/auth/login"> Login | </NavLink>
            <NavLink className="nav-link" exact to="/auth/signup">Signup | </NavLink>
            <NavLink className="nav-link" exact to="/character/view/:id">Character | </NavLink>
            <NavLink className="nav-link" exact to="/game/:id">My Game</NavLink>
            <NavLink className="nav-link" exact to="/game/all">All Game</NavLink>
        </div>
    )
}

export default Navbar