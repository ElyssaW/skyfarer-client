import React, { useState, useEffect, useRef } from 'react'
import Messages from './Messages'
import MessageBox from './MessageBox'
import useChat from '../../../utils/useChat'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL
const io = require('socket.io-client')

const MessageWindow = (props) => {

    const allMessages = props.game.messages
    const { messages, sendMessage } = useChat(props.gameId, props.currentUser)
    const [newMessage, setNewMessage] = useState('')

    const handleChange = (e) => {
        setNewMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        sendMessage(newMessage)
        setNewMessage('')
    }

    const handleEdit = (e) => {
        console.log('Handling edit')
    }

    const handleDelete = (e) => {
        console.log('Handling delete')
    }

    return (
        <div>
            MessageWindow
            < Messages messages={allMessages.concat(messages)} currentUser={props.currentUser} handleEdit={handleEdit} handleDelete={handleDelete} />
            < MessageBox writeMessage={newMessage} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    )
}

export default MessageWindow