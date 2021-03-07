import React, { useState, useEffect, useRef } from 'react'
import jwt_decode from 'jwt-decode';
const io = require('socket.io-client')

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL
const newChatMessage = 'newChatMessage'

const useChat = (gameId, currentUser) => {

    console.log('Current user in useChat...')
    console.log(currentUser)

    console.log('Game id')
    console.log(gameId)

    if (!currentUser) {
        currentUser = jwt_decode(localStorage.getItem('jwtToken'))
        console.log('Current token in useChat...')
        console.log(currentUser)
    }

    let extraHeaders
    if (currentUser) {
        extraHeaders = {
            userId: currentUser._id,
            username: currentUser.name
          }
    } else {
        extraHeaders = {
            userId: 'guest',
            username: 'guest'
          }
    }

    const [messages, setMessages] = useState([])
    const socketRef = useRef()

    useEffect(() => {
        socketRef.current = io(REACT_APP_SERVER_URL, {
            withCredentials: false,
            query: { gameId },
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

    }, [])

    const sendMessage = (messageBody) => {
        socketRef.current.emit(newChatMessage, {
            body: messageBody,
            senderId: socketRef.current.id
        })
    }

    return { messages, sendMessage }
}

export default useChat