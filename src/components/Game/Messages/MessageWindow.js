import React, { useState, useEffect, useRef } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import Messages from './Messages'
import MessageBox from './MessageBox'
import CharacterWindow from '../../Character/CharacterWindow'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL
const io = require('socket.io-client')
const axios = require('axios')

const MessageWindow = (props) => {

    const [editMessage, setEditMessage] = useState(null)
    const [newMessage, setNewMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Sending...')
        props.sendMessage(newMessage)
        setNewMessage('')
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

    return (
        < div className='flex' >
            
            < Col >
                MessageWindow
                < Messages 
                    messages={props.messages} 
                    currentUser={props.currentUser} 
                    handleEdit={handleEdit} 
                    handleDelete={handleDelete} 
                />

                < MessageBox 
                    newMessage={newMessage} 
                    handleChange={handleChange} 
                    editMessage={editMessage} 
                    handleSubmitEdit={handleSubmitEdit} 
                    cancelEdit={cancelEdit} 
                    handleSubmit={handleSubmit} 
                />
            </Col>

        </div>
    )
}

export default MessageWindow