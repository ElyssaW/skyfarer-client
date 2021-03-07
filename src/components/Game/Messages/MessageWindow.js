import React, { useState, useEffect, useRef } from 'react'
import Messages from './Messages'
import MessageBox from './MessageBox'
import useChat from '../../../utils/useChat'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL
const io = require('socket.io-client')

const MessageWindow = (props) => {

    const { roomId } = '69897956867867'
    const { messages, sendMessage } = useChat(roomId, props.currentUser)
    const [newMessage, setNewMessage] = useState('')

    const handleChange = (e) => {
        setNewMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        sendMessage(newMessage)
        setNewMessage('')
    }

    // const [newMessages, setNewMessages] = useState([])
    // const [writeMessage, setWriteMessage] = useState('')

    // if (!props.currentUser) {
    //     return <p>Loading...</p>
    // }

    // let socket = io(REACT_APP_SERVER_URL, {
        // withCredentials: false,
        // extraHeaders: {
        //   userId: props.currentUser._id,
        //   username: props.currentUser.username
        // }
    // })

    // socket.on('message', (msg, id) => {
    //     console.log('Message received')
    //     console.log('msg: ' + msg)
    //     console.log('id: ' + id)

    //     let tempMessages = newMessages
    //     tempMessages.push(msg)
    //     setNewMessages([...tempMessages])
    // })

    // const handleChange = (e) => {
    //     setWriteMessage(e.target.value)
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     console.log('Message sent')
    //     console.log(socket.id)

    //     if (writeMessage) {
    //         socket.emit('message', writeMessage)
    //       }
    // }

    return (
        <div>
            MessageWindow
            < Messages messages={messages} />
            < MessageBox writeMessage={newMessage} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    )
}

export default MessageWindow