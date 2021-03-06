import React from 'react'

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL
const axios = require('axios')

const GameCard = (props) => {

    const handleJoin = (e) => {
        axios.post(`${REACT_APP_SERVER_URL}`)
    }

    return (
        <div className='container'>
            {props.game.title}
            < button >Request to Join Game</button>
        </div>
    )
}

export default GameCard