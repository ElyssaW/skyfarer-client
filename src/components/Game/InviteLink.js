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
        <div className='drop-shadow invite-div'>
            <h1 className='ribbon'>You've been invited!</h1>

                <div className='invite-body'>
                <h2>{props.gamesData ? props.gamesData[props.gameId].title : null }</h2>
                <h4>{props.gamesData ? props.gamesData[props.gameId].desc : null }</h4>

                <div>
                <button className='button' onClick={() => {addUserToGame(props.currentUser)}}>Take Me There!</button>
                <Link to='/'><button className='button'>No Thanks</button></Link>
                </div>
                </div>
        </div>
        </ Container >
    )
}

export default InviteLink