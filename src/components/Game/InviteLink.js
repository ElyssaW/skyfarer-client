import React, { useEffect } from 'react' 
import Redirect from 'react-router-dom'

const axios = require('axios')
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const InviteLink = (props) => {

    

    return (
        <div>
            <h1>You've been invited!</h1>
            <p>{props.gamesData[props.gameId].title}</p>
            <button className='button'>Take Me There</button>
            <button className='button'>No Thanks</button>
        </div>
    )
}

export default InviteLink