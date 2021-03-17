import React, { useState } from 'react' 
import { Container } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'

const axios = require('axios')
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const InviteLink = (props) => {

    const [userAdded, setUserAdded] = useState(false)

    const addUserToGame = (user) => {
        console.log('Adding user...')

        axios({
            url: `${REACT_APP_SERVER_URL}game/addUser/${props.gameId}`,
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
            data:{
                user
            }
        })
        .then(res => {
            console.log(res)
            setUserAdded(true)
        })
    }

    if (userAdded) {
        return (
            <Redirect to={`/game/view/${props.gameId}`} currentUser={props.currentUser} />
        )
    }

    return (
        < Container >
            <h1>You've been invited!</h1>
            <p>{props.gamesData ? props.gamesData[props.gameId].title : null }</p>
            <button className='button' onClick={() => {addUserToGame(props.currentUser)}}>Take Me There!</button>
            <Link to='/'><button className='button'>No Thanks</button></Link>
        </ Container >
    )
}

export default InviteLink