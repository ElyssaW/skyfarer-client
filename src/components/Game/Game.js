import React, { useState, useEffect, useRef } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import MessageWindow from './Messages/MessageWindow'
import Sidebar from './Sidebar'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL
const io = require('socket.io-client')
const axios = require('axios')

const Game = (props) => {

    console.log('Game render')

    const [gameState, setGameState] = useState(null)
    const [playerCharacters, setPlayerCharacters] = useState({})
    const [userCharacters, setUserCharacters] = useState(null)
    const [playingAs, setPlayingAs] = useState(null)
    const [updating, setUpdating] = useState('')

    const [messages, setMessages] = useState([])

    // -------- GAME STATE ----------------

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
            setMessages([...res.data.messages])
        })
    }, [])

    useEffect(() => {
        if(props.currentUser) {
            console.log('Creating character hash')
            console.log(props.currentUser.characters)
            let userCharacterHash = {}
            if (props.currentUser && props.currentUser.characters) {
                props.currentUser.characters.forEach(character => {
                    userCharacterHash[character._id] = character
                }) 
                setUserCharacters(userCharacterHash)
            }
            console.log(userCharacterHash)
            console.log(userCharacters)
        }
    }, [props.currentUser])

    // -------- SOCKET ----------------

    const socketRef = useRef()

    let extraHeaders = props.currentUser ? {
        userId: props.currentUser._id,
        username: props.currentUser.name
    } : {
        userId: 'guest',
        username: 'guest'
    }

    useEffect(() => {
        socketRef.current = io(REACT_APP_SERVER_URL, {
            withCredentials: false,
            query: { gameId: props.gameId },
            extraHeaders: extraHeaders
        })

        socketRef.current.on('newChatMessage', (newMessage, updatedCharacter) => {
            setMessages((messages) => [...messages, newMessage])

            if (updatedCharacter._id === playingAs._id) {
                updatePlayingAs(updatedCharacter)
            }
        })

        socketRef.current.on('updateMessages', (newMessages) => {
            setMessages([...newMessages])
        })

        socketRef.current.on('updatePlayerCharacters', (newPlayerCharacters) => {
            setPlayerCharacters(newPlayerCharacters)
        })

        socketRef.current.on('updateGameState', (newGameState) => {
            setGameState(newGameState)
        })

        return () => {
            if (playingAs) {
                disconnectPlayingAs(playingAs)
            }
            socketRef.current.disconnect()
        }
    }, [])

    const updatePlayingAs = (newPlayingAs) => {
        setPlayingAs(newPlayingAs)

        let tempUserCharacters = userCharacters
        tempUserCharacters[newPlayingAs._id] = newPlayingAs
        setUserCharacters(tempUserCharacters)

        let tempPlayerCharacters = playerCharacters
        tempPlayerCharacters[newPlayingAs._id] = newPlayingAs
        updatePlayerCharacters(tempPlayerCharacters)

        const timer = setTimeout(() => {
            setUpdating('')
        }, 1000)
    }

    const updatePlayerCharacters = (newPlayerCharacters) => {
        setPlayerCharacters(newPlayerCharacters)

        socketRef.current.emit('updatePlayerCharacters', {
            newPlayerCharacters
        })
    }

    const disconnectPlayingAs = (newPlayingAs) => {
        let tempPlayerCharacters = playerCharacters
        delete tempPlayerCharacters[playingAs._id]
        updatePlayerCharacters(tempPlayerCharacters)
    }

    const updateGameState = (newGameState) => {
        console.log('Updating game state')
        setGameState(newGameState)
    }

    // ------------ SOCKET MESSAGES ---------------

    const sendMessage = (messageBody) => {
        console.log('Sending message...')
        console.log(props.currentUser, playingAs)
        if (props.currentUser && playingAs) {
            let rollWords = [ 
                '!veils', '!veil', '!irons', '!iron',  '!mirrors', 
                '!mirror', '!hearts', '!heart', '!peril3', '!peril6', '!peril', '!tenacity1',
                '!tenacity3', '!tenacity6', '!tenacity', '!gm', '!ooc'
            ].join('|')
    
            let rolls = messageBody.match(new RegExp(rollWords, 'gi'))
            messageBody = messageBody.replace(new RegExp(rollWords, 'gi'), '').trim().replace(/ +/g, ' ')

            let newMessage = {
                body: messageBody,
                username: props.currentUser && props.currentUser.name ? props.currentUser.name : 'Guest',
                userId: props.currentUser ? props.currentUser._id : socketRef.current.id,
                character: playingAs,
                rolls: rolls
            }

            console.log(newMessage)
    
            socketRef.current.emit('newChatMessage', newMessage)
        }
    }

    // ------------ DELETE GAME --------------------

    const deleteGame = (e) => {
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

    let gameDisplay
    if (gameState && props.currentUser) {
        gameDisplay = (
            < Row className='game-window' >
                < Col className='col-2 character-sidebar'>
                    < Sidebar 
                        playingAs={playingAs}
                        updatePlayingAs={updatePlayingAs}
                        userCharacters={userCharacters}
                        pushUpdate={setUpdating}
                        updating={updating}
                    />
                </Col>
                < Col >
                    < MessageWindow 
                        currentUser={props.currentUser} 
                        userCharacters={userCharacters} 
                        playerCharacters={playerCharacters}
                        gameState={gameState} 
                        updateGameState={updateGameState}
                        sendMessage={sendMessage}
                        messages={messages}
                    />
                    <span>{updating}</span>
                </Col>
            </Row>
        )
    } else {
        gameDisplay = <p>Loading..</p>
    }

    return (
        < div className='game-div' >
            {gameDisplay}
        </ div >
    )
}

export default Game