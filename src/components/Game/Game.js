import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MessageWindow from './Messages/MessageWindow'

const axios = require('axios')
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Game = (props) => {

    const handleDelete = (e) => {
        e.preventDefault()
        console.log('Handling delete')
        axios({
            url: `${REACT_APP_SERVER_URL}game/delete/${props.gameId}`,
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
        .then(res => {
            console.log(res)
        })
    }

    return (
        <div>
            Game page
            < MessageWindow currentUser={props.currentUser} gameId={props.gameId} />
            {/* < Link to='/game/:id/history' >Message Backlog</Link> */}
            <button onClick={(e) => {handleDelete(e)}}>< Link to='/' >Delete Game</Link></button>
        </div>
    )
}

export default Game