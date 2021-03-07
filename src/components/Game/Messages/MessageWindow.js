import React, { useState, useEffect, useRef } from 'react'
import Messages from './Messages'
import MessageBox from './MessageBox'
import useChat from '../../../utils/useChat'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL
const io = require('socket.io-client')

const MessageWindow = (props) => {

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

    return (
        <div>
            MessageWindow
            < Messages messages={messages} />
            < MessageBox writeMessage={newMessage} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    )
}

export default MessageWindow