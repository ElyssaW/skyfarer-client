import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import { Container } from 'react-bootstrap'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL
const axios = require('axios')

const MessageBacklog = (props) => {

    const [gameState, setGameState] = useState({})
    const [history, setHistory] = useState([])

    useEffect(() => {
        console.log('Fetching game history...')
        axios({
            url: `${REACT_APP_SERVER_URL}game/history/${props.gameId}`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
        .then(res => {
            console.log(res)
            setGameState(res.data)
            setHistory([...res.data.messages])
            setGameState(res.data)
        })
    }, [])

    const handleDelete = () => {
        console.log('Handling delete')
    }

    const handleEdit = () => {
        console.log('Handling edit')
    }

    return (
        < Container >
            Message Backlog
            < Messages 
                messages={history} 
                currentUser={props.currentUser} 
                gameState={gameState}
                handleEdit={handleEdit} 
                handleDelete={handleDelete} 
            />
        </ Container >
    )
}

export default MessageBacklog