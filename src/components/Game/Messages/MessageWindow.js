import React, { useState, useEffect, useRef } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import Messages from './Messages'
import MessageBox from './MessageBox'
import CharacterWindow from '../../Character/CharacterWindow'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL
const io = require('socket.io-client')
const axios = require('axios')

const MessageWindow = (props) => {

    const [newMessage, setNewMessage] = useState('')
    const [playingAs, setPlayingAs] = useState(null)
    const [messages, setMessages] = useState([...props.gameState.messages])
    const [editMessage, setEditMessage] = useState(null)
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
            query: { gameId: props.gameState._id },
            extraHeaders: extraHeaders
        })

        socketRef.current.on('newChatMessage', (message, updatedGame) => {
            console.log('Updated game')
            console.log(updatedGame)
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.currentId
            }
            props.updateGameState(updatedGame)
            setMessages((messages) => [...messages, incomingMessage])
        })

        return () => {
            socketRef.current.disconnect()
        }
    }, [])

    const sendMessage = (messageBody) => {
        if (playingAs) {
            let rollWords = [ 
                '!veils', '!veil', '!irons', '!iron',  '!mirrors', 
                '!mirror', '!hearts', '!heart', '!peril3', '!peril6', '!peril', '!tenacity1',
                '!tenacity3', '!tenacity6', '!tenacity', '!gm', '!ooc'
            ].join('|')
    
            let rolls = messageBody.match(new RegExp(rollWords, 'gi'))
            messageBody = messageBody.replace(new RegExp(rollWords, 'gi'), '').trim().replace(/ +/g, ' ')
    
            socketRef.current.emit('newChatMessage', {
                body: messageBody,
                username: props.currentUser && props.currentUser.name ? props.currentUser.name : 'Guest',
                userId: props.currentUser ? props.currentUser._id : socketRef.current.id,
                character: playingAs,
                rolls: rolls
            })
        }
    }

    const handleChange = (e) => {
        setNewMessage(e.target.value)
    }

    const handleEdit = (message) => {
        console.log('Handling edit')
        setEditMessage(message)
        setNewMessage(message.body)
    }

    const handleSubmitEdit = (e) => {
        console.log('Submitting edit')
        e.preventDefault()

        let editedMessage = editMessage
        editedMessage.body = newMessage
        
        axios({
            url: `${REACT_APP_SERVER_URL}message/edit/${editedMessage._id}`,
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
            data: editedMessage
        })
        .then(res => {
            console.log('New game data received')
            let tempGameState = props.gameState
            tempGameState.messages = res.data.updatedMessages
            props.updateGameState(tempGameState)
            setEditMessage(null)
            setNewMessage('')
        })
    }

    const cancelEdit = (message) => {
        console.log('Cancelling edit')
        setEditMessage(null)
        setNewMessage('')
    }

    const handleDelete = (message, index) => {
        console.log('Handling delete')

        let tempMessages = messages
        tempMessages.splice(index, 1)
        setMessages([...tempMessages])

        axios({
            url: `${REACT_APP_SERVER_URL}message/delete/${message._id}`,
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
        .then(res => {
            console.log(res)
        })
    }

    const handlePlayingAs = (e) => {
        setPlayingAs(props.userCharacters[e.target.value])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Sending...')
        sendMessage(newMessage)
        setNewMessage('')
    }

    let dropDownOptions = props.currentUser && props.currentUser.characters ? props.currentUser.characters.map(character => {
        return <option value={character._id}>{character.name}</option>
    }) : null

    return (
        < Row >
            < Col className='col-3'>
                < CharacterWindow character={playingAs} />
                
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Playing As...</Form.Label>
                    <Form.Control as="select" onChange={(e) => {handlePlayingAs(e)}} value={playingAs} custom>
                    <option value={null}>Select character</option>
                    {dropDownOptions}
                    <option value={null}>Guest</option>
                    </Form.Control>
                </Form.Group>
            </Col>
            < Col >
                MessageWindow
                < Messages messages={messages} currentUser={props.currentUser} handleEdit={handleEdit} handleDelete={handleDelete} />
                < MessageBox newMessage={newMessage} handleChange={handleChange} editMessage={editMessage} handleSubmitEdit={handleSubmitEdit} cancelEdit={cancelEdit} handleSubmit={handleSubmit} />
            </Col>
        </Row>
    )
}

export default MessageWindow