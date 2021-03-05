import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

    return (
        <div>
            Home page
            <p>
                < Link to='/games/all' >Find a game</Link>
            </p>
            <p>
                < Link to='/game/new' >Start a new game</Link>
            </p>
        </div>
    )
}

export default Home