import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

    return (
        <div className='home-div'>
            <div>
                <h1 className='home-title'>
                    <span className='floating floating-big floating-delay-2'>S</span>
                    <span className='floating floating-big floating-delay-1'>k</span>
                    <span className='floating floating-big'>y</span>
                    <span className='floating floating-big floating-delay-1'>f</span>
                    <span className='floating floating-big floating-delay-2'>a</span>
                    <span className='floating floating-big floating-delay-1'>r</span>
                    <span className='floating floating-big'>e</span>
                    <span className='floating floating-big floating-delay-1'>r</span>
                </h1>
                <h2 className='home-subtitle'>Play-by-post through the High Wilderness</h2>
            </div>
            <div className='home-link-div'>
                <p>
                < Link to='/auth/login' className='home-link' >Log in</Link>
                </p>
                <p>
                < Link to='/game/new' className='home-link' >Join a game</Link>
                </p>
                < Link to='/game/new' className='home-link' >Start a game</Link>
            </div>
        </div>
    )
}

export default Home