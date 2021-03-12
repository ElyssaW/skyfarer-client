import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MessageWindow from './Messages/MessageWindow'

const axios = require('axios')
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Game = (props) => {

    const [gameState, setGameState] = useState(null)

    useEffect(() => {
        console.log('Fetching game data...')
        axios({
            url: `${REACT_APP_SERVER_URL}game/view/${props.gameId}`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
        .then(res => {
            console.log(res)
            setGameState(res.data)
        })
    }, [props.gameId])

    const updateGameState = (newGameState) => {
        console.log('Updating game state')
        setGameState(newGameState)
    }

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

    let userCharacters = {}
    if (props.currentUser && props.currentUser.characters) {
        console.log('Creating character hash map')
        console.log(props.currentUser)
        props.currentUser.characters.forEach(character => {
            console.log(character)
            userCharacters[character._id] = character
        }) 
    }

    let gameDisplay
    if (gameState) {

        gameDisplay = (
            <div>
            Game page
            < MessageWindow 
                currentUser={props.currentUser} 
                userCharacters={userCharacters} 
                gameState={gameState} 
                updateGameState={updateGameState}
            />

            <button onClick={(e) => {handleDelete(e)}}>< Link to='/' >Delete Game</Link></button>
        </div>
        )
    } else {
        gameDisplay = <p>Loading..</p>
    }

    return (
        <>
            {gameDisplay}
        </>
    )
}

export default Game