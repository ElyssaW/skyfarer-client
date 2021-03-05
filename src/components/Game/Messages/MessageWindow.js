import React, { useState, useEffect } from 'react'
import Messages from './Messages'
import MessageBox from './MessageBox'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL
const io = require('socket.io-client')

const MessageWindow = (props) => {

    const [newMessages, setNewMessages] = useState(null)
    const [writeMessage, setWriteMessage] = useState('')

    let socket

    useEffect(() => {
        
        socket = io(REACT_APP_SERVER_URL, {
          withCredentials: false,
          extraHeaders: {
            userId: props.currentUser.id,
            username: props.currentUser.username
          }
        })

        socket.on('message', (msg, id) => {
            console.log('Message received')
            console.log('msg: ' + msg)
            console.log('id: ' + id)
  
            let tempMessages = newMessages
            tempMessages.push(msg)
            setNewMessages([...tempMessages])
          })
  
    }, [])

    const handleChange = (e) => {
        setWriteMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (socket) {
            console.log('Message sent')
            if (writeMessage) {
              socket.emit('chat message', writeMessage)
              setWriteMessage('')
            }
        } else {
            console.log('Hmm. No socket initialized...')
        }
    }

    return (
        <div>
            MessageWindow
            < Messages messages={[]} />
            < MessageBox writeMessage={writeMessage} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    )
}

export default MessageWindow