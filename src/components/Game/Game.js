import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MessageWindow from './Messages/MessageWindow'

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Game = (props) => {

    return (
        <div>
            Game page
            < MessageWindow currentUser={props.currentUser} />
            {/* < Link to='/game/:id/history' >Message Backlog</Link> */}
        </div>
    )
}

export default Game