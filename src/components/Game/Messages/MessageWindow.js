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
    const [messages, setMessages] = useState([...props.game.messages])
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
            query: { gameId: props.game._id },
            extraHeaders: extraHeaders
        })

        socketRef.current.on('newChatMessage', (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.currentId
            }
            setMessages((messages) => [...messages, incomingMessage])
        })

        return () => {
            socketRef.current.disconnect()
        }

    }, [])

    const sendMessage = (messageBody) => {
        if (playingAs) {
            let commandWords = [ 
                '!gm', '!ooc'
            ].join('|')
            let rollWords = [ 
                '!veils', '!veil', '!irons', '!iron',  '!mirrors', 
                '!mirror', '!hearts', '!heart', '!peril', '!tenacity'
            ].join('|')
    
            let commands = messageBody.match(new RegExp(commandWords, 'gi'))
            let rolls = messageBody.match(new RegExp(rollWords, 'gi'))
            messageBody = messageBody.replace(new RegExp(commandWords, 'gi'), '').trim().replace(/ +/g, ' ')
            messageBody = messageBody.replace(new RegExp(rollWords, 'gi'), '').trim().replace(/ +/g, ' ')
    
            socketRef.current.emit('newChatMessage', {
                body: messageBody,
                username: props.currentUser && props.currentUser.name ? props.currentUser.name : 'Guest',
                userId: props.currentUser ? props.currentUser._id : socketRef.current.id,
                character: playingAs,
                commands: commands,
                rolls: rolls
            })
        }
    }

    const handleChange = (e) => {
        setNewMessage(e.target.value)
    }

    const handleEdit = (message) => {
        console.log('Handling edit')
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

    const handleDropdown = (e) => {
        console.log('Drop down...')
        console.log(e.target.value)
        setPlayingAs(props.characters[e.target.value])
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
                    <Form.Control as="select" onChange={(e) => {handleDropdown(e)}} value={playingAs} custom>
                    <option value={null}>Select character</option>
                    {dropDownOptions}
                    <option value={null}>Guest</option>
                    </Form.Control>
                </Form.Group>
            </Col>
            < Col >
                MessageWindow
                < Messages messages={messages} currentUser={props.currentUser} handleEdit={handleEdit} handleDelete={handleDelete} />
                < MessageBox writeMessage={newMessage} handleChange={handleChange} handleSubmit={handleSubmit} />
            </Col>
        </Row>
    )
}

export default MessageWindow