import React, { useState, useEffect, useRef } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import Messages from './Messages'
import MessageBox from './MessageBox'
import CharacterWindow from '../../Character/CharacterWindow'
import useChat from '../../../utils/useChat'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL
const io = require('socket.io-client')

const MessageWindow = (props) => {

    const allMessages = props.game.messages
    const { messages, sendMessage } = useChat(props.gameId, props.currentUser)
    const [newMessage, setNewMessage] = useState('')
    const [playingAs, setPlayingAs] = useState(null)

    const handleChange = (e) => {
        setNewMessage(e.target.value)
    }

    const handleEdit = (e) => {
        console.log('Handling edit')
    }

    const handleDelete = (e) => {
        console.log('Handling delete')
    }

    const handleDropdown = (e) => {
        console.log('Drop down...')
        console.log(e.target.value)
        setPlayingAs(props.characters[e.target.value])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
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
                < Messages messages={allMessages.concat(messages)} currentUser={props.currentUser} handleEdit={handleEdit} handleDelete={handleDelete} />
                < MessageBox writeMessage={newMessage} handleChange={handleChange} handleSubmit={handleSubmit} />
            </Col>
        </Row>
    )
}

export default MessageWindow