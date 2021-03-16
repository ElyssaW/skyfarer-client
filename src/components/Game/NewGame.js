import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Col, Container } from 'react-bootstrap'
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
        axios({            
            url: `${REACT_APP_SERVER_URL}game/new`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }, 
            data: newGame 
        })
        .then(res => {
            console.log(res)
            let tempUser = props.currentUser
            tempUser.games.push(res.data.newGame)
            props.setCurrentUser(tempUser)
            setCreatedGame(res.data.newGame)
        })
    }

    if (createdGame) {
        console.log(createdGame)
        return <Redirect to={`/auth/myprofile`} />
    }

    return (
        <Container >
            < Form >
                < Form.Label >Game Title</Form.Label>
                < Form.Control onChange={(e) => {setGameTitle(e.target.value)}} ></Form.Control>

                < Form.Label >Description</Form.Label>
                < Form.Control onChange={(e) => {setDesc(e.target.value)}} ></Form.Control>

                < Form.Label >Add tags</Form.Label>
                < Form.Control onChange={(e) => {setTags(e.target.value)}} ></Form.Control>
                
                < Form.Label >Add users (Enter by email)</Form.Label>
                < Form.Control onChange={(e) => {setUsers(e.target.value)}} ></Form.Control>

                < input className='button' type='submit' onClick={(e) => handleSubmit(e)} />
            </Form>
        </Container>
    )
}

export default NewGame