import React, { useState, useEffect, useRef } from 'react'
const io = require('socket.io-client')

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL
const newChatMessage = 'newChatMessage'

const useChat = (roomId, currentUser) => {

    console.log('Current user in useChat...')
    console.log(currentUser)

    let extraHeaders
    if (currentUser) {
        extraHeaders = {
            userId: currentUser._id,
            username: currentUser.name
          }
    } else {
        extraHeaders = {
            userId: '58864ohg6i',
            username: 'Elyssa'
          }
    }

    const [messages, setMessages] = useState([])
    const socketRef = useRef()

    useEffect(() => {
        socketRef.current = io(REACT_APP_SERVER_URL, {
            withCredentials: false,
            query: { roomId },
            extraHeaders: extraHeaders
        })

        socketRef.current.on(newChatMessage, (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.currentId
            }
            console.log('Incoming message...')
            console.log(incomingMessage)
            setMessages((messages) => [...messages, incomingMessage])
        })

        return () => {
            socketRef.current.disconnect()
        }

    }, [roomId])

    const sendMessage = (messageBody) => {
        socketRef.current.emit(newChatMessage, {
            body: messageBody,
            senderId: socketRef.current.id
        })
    }

    return { messages, sendMessage }
}

export default useChat