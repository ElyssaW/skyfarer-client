import React from 'react'
import SkyfarerLogo from '../../images/skyfarer-logo.png'
import { NavLink, Link } from 'react-router-dom'

const Navbar = (props) => {

    return (
        <div className='nav-bar'>
            <div className='nav-link-bank flex'>
                <NavLink className="nav-link" exact to="/"> Home </NavLink>
                <NavLink className="nav-link" exact to="/games/all">All Games</NavLink>
            </div>

            < div className='skyfarer-logo' >S<span className='navbar-logo-middle'>kyfare</span><span className='navbar-logo-end'>r</span></div>

            { 
            props.currentUser ? 
            <div className='nav-link-bank flex'>
                <NavLink className="nav-link" exact to="/auth/myprofile">{props.currentUser.name}</NavLink>
                <span className="nav-link" onClick={props.handleLogout}>Logout</span>
            </div> :
            <div className='nav-link-bank flex'>
                <NavLink className="nav-link" exact to="/auth/login"> Login </NavLink>
                <NavLink className="nav-link" exact to="/auth/signup">Signup </NavLink>
            </div>
            }
        </div>
    )
}

export default Navbar