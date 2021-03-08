import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Col } from 'react-bootstrap'
const axios = require('axios')
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const NewGame = (props) => {

    const [title, setGameTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [tags, setTags] = useState('')
    const [users, setUsers] = useState('')
    const [createdGame, setCreatedGame] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Submitting')
        let newGame = {title, desc, tags, users, currentUser: props.currentUser}

        console.log(newGame)
        axios.post(`${REACT_APP_SERVER_URL}game/new`, newGame)
        .then(res => {
            console.log(res)
            props.createGamesHash(res.data.gamesData)
            setCreatedGame(res.data.newGame)
        })
    }

    if (createdGame) {
        console.log(createdGame)
        return <Redirect to={`/game/${createdGame._id}`} />
    }

    return (
        <div >
            < Form >
                < Form.Label >Game Title</Form.Label>
                < Form.Control onChange={(e) => {setGameTitle(e.target.value)}} ></Form.Control>

                < Form.Label >Description</Form.Label>
                < Form.Control onChange={(e) => {setDesc(e.target.value)}} ></Form.Control>

                < Form.Label >Add tags</Form.Label>
                < Form.Control onChange={(e) => {setTags(e.target.value)}} ></Form.Control>
                
                < Form.Label >Add users (Enter by email)</Form.Label>
                < Form.Control onChange={(e) => {setUsers(e.target.value)}} ></Form.Control>

                < input type='submit' onClick={(e) => handleSubmit(e)} />
            </Form>
        </div>
    )
}

export default NewGame