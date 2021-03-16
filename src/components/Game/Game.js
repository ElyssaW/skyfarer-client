import React, { useState, useEffect, useRef } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import MessageWindow from './Messages/MessageWindow'
import LeftSidebar from './Sidebar/LeftSidebar'
import RightSidebar from './Sidebar/RightSidebar'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL
const io = require('socket.io-client')
const axios = require('axios')

const Game = (props) => {

    console.log('Game render')

    const [gameState, setGameState] = useState(null)
    const [playerCharacters, setPlayerCharacters] = useState({})
    const [userCharacters, setUserCharacters] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState({})
    const [playingAs, setPlayingAs] = useState(null)
    const [updating, setUpdating] = useState('')
    const [sidebarIndex, setSidebarIndex] = useState(0)
    const [sidebarDisplay, setSidebarDisplay] = useState(null)
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

    useEffect(() => {
        let extraHeaders = props.currentUser ? {
            userId: props.currentUser._id,
            username: props.currentUser.name
        } : null

        socketRef.current = io(REACT_APP_SERVER_URL, {
            withCredentials: false,
            query: { gameId: props.gameId },
            extraHeaders: extraHeaders
        })

        socketRef.current.on('userConnected', users => {
            console.log('New user connected')
            setOnlineUsers(users)
        })

        socketRef.current.on('userDisconnected', users => {
            console.log('User disconnected')
            setOnlineUsers(users)
        })

        socketRef.current.on('updateUsers', (newUsers) => {
            setOnlineUsers(newUsers)
        })

        socketRef.current.on('newChatMessage', (newMessage, updatedCharacter) => {
            if (updatedCharacter && updatedCharacter.userId === props.currentUser._id) {
                updatePlayingAs(updatedCharacter)
            }

            if (messages.length >= 30) {
                let newMessages = messages
                newMessages.push(newMessage)
                newMessages = newMessages.slice(newMessages.length-29)
                setMessages((messages) => [...newMessages])
            } else {
                setMessages((messages) => [...messages, newMessage])
            }
        })

        socketRef.current.on('updateMessages', (newMessages) => {
            console.log(newMessages)
            setMessages([...newMessages])
        })

        socketRef.current.on('updateSingleCharacter', (updatedCharacter) => {
            console.log('Updating single character')
            console.log(updatedCharacter)
            let tempPlayerCharacters = playerCharacters
            tempPlayerCharacters[updatedCharacter._id] = updatedCharacter
            setPlayerCharacters(tempPlayerCharacters)
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
            socketRef.current.disconnect(playingAs)
        }
    }, [props.currentUser])

    const setNewPlayingAs = (newPlayingAs) => {
        socketRef.current.emit('setNewPlayingAs', newPlayingAs, props.currentUser)
        setPlayingAs(newPlayingAs)
    }

    const updatePlayingAs = (newPlayingAs) => {
        setPlayingAs(newPlayingAs)

        let tempUserCharacters = userCharacters ? userCharacters : {}
        tempUserCharacters[newPlayingAs._id] = newPlayingAs
        setUserCharacters(tempUserCharacters)

        socketRef.current.emit('updateSingleCharacter', newPlayingAs)

        const timer = setTimeout(() => {
            setUpdating('')
        }, 1000)
    }

    const updatePlayerCharacters = (newPlayerCharacters) => {
        setPlayerCharacters(newPlayerCharacters)

        socketRef.current.emit('updatePlayerCharacters', newPlayerCharacters)
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
        if (props.currentUser) {
            let rollWords = [ 
                '!veils', '!veil', '!irons', '!iron',  '!mirrors', 
                '!mirror', '!hearts', '!heart', 'x2', 
                '!peril3', '!peril6', '!peril', '!tenacity1',
                '!tenacity3', '!tenacity6', '!tenacity', '!gm', '!ooc'
            ].join('|')
    
            let rolls = messageBody.match(new RegExp(rollWords, 'gi'))
            let plusMatch = messageBody.match(new RegExp('\\+trait', 'gi'))
            let plus = plusMatch ? plusMatch.length : 0
            let minusMatch = messageBody.match(new RegExp('\\-trait', 'gi'))
            let minus = minusMatch ? minusMatch.length : 0
            messageBody = messageBody.replace(new RegExp(rollWords + '|\\-trait|\\+trait', 'gi'), '').trim().replace(/ +/g, ' ')

            let newMessage = {
                body: messageBody,
                username: props.currentUser && props.currentUser.name ? props.currentUser.name : 'Guest',
                userId: props.currentUser ? props.currentUser._id : socketRef.current.id,
                character: playingAs,
                rolls: rolls,
                plus: plus,
                minus: minus
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
                < Col className='col-3 character-sidebar'>
                    < LeftSidebar 
                        playingAs={playingAs}
                        setNewPlayingAs={setNewPlayingAs}
                        updatePlayingAs={updatePlayingAs}
                        userCharacters={userCharacters}
                        pushUpdate={setUpdating}
                        updating={updating}
                    />
                </Col>

                < Col className='message-div'>
                    < MessageWindow 
                        currentUser={props.currentUser} 
                        userCharacters={userCharacters} 
                        playerCharacters={playerCharacters}
                        gameState={gameState} 
                        updateGameState={updateGameState}
                        sendMessage={sendMessage}
                        messages={messages}
                    />
                </Col>

                    < RightSidebar 
                        playingAs={playingAs}
                        updatePlayingAs={updatePlayingAs}
                        userCharacters={userCharacters}
                        pushUpdate={setUpdating}
                        updating={updating}
                        onlineUsers={onlineUsers}
                        playerCharacters={playerCharacters}
                        gameState={gameState}
                    />
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