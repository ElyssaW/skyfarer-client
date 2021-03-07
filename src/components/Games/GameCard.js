import React from 'react'
import { Link } from 'react-router-dom'

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL
const axios = require('axios')

const GameCard = (props) => {

    const handleJoin = (e) => {
        axios.post(`${REACT_APP_SERVER_URL}`)
    }

    return (
        <div>
            {props.game.title}
            <Link to={`/game/${props.game._id}`}>< button >Join Game</button></Link>
        </div>
    )
}

export default GameCard