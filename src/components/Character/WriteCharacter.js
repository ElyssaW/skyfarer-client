import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Form, Col } from 'react-bootstrap'
import jwt_decode from 'jwt-decode';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL
const axios = require('axios')

const WriteCharacter = (props) => {

    const [name, setName] = useState('')
    const [trait1, setTrait1] = useState('')
    const [trait2, setTrait2] = useState('')
    const [profession, setProfession] = useState('')
    const [irons, setIrons] = useState(null)
    const [hearts, setHearts] = useState(null)
    const [veils, setVeils] = useState(null)
    const [mirrors, setMirrors] = useState(null)
    const [integrity1, setIntegrity1] = useState('')
    const [integrity2, setIntegrity2] = useState('')
    const [integrity3, setIntegrity3] = useState('')
    const [integrity4, setIntegrity4] = useState('')
    const [publicNotes, setPublicNotes] = useState('')
    const [privateNotes, setPrivateNotes] = useState('')

    const [error, setError] = useState(false)
    const [newChar, setNewChar] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Sending create character request...')

        let newChar = {
            name,
            traits: [
                { desc: trait1 }, 
                { desc: trait2 }],
            profession,
            irons,
            hearts,
            veils,
            mirrors,
            integrities: [
                { desc: `I love ${integrity1}` }, 
                { desc: `I hate ${integrity2}` }, 
                { desc: `I will always ${integrity3}` }, 
                { desc: `I will never ${integrity4}` }],
            publicNotes,
            privateNotes,
            userId: props.currentUser.id,
            gameId: '6043058a5e09284a6c123065'
        }

        axios.post(`${REACT_APP_SERVER_URL}character/new`, newChar)
        .then(res => {
            console.log(res)
            props.nowCurrentUser(res.data.updatedUser)
            setNewChar(res.data.newCharacter)
        }).catch(res => {
            console.log(res)
            setError(true)
        })
    }

    let errorMsg = error ? <p>Error creating character</p> : null

    // if (newChar) return <Redirect to={`/character/view/${newChar._id}`} currentUser={props.currentUser} />
    
    return (
        < Container >
            { errorMsg }
            < Form >
                < Form.Group >
                    < Form.Label htmlFor='name' >I am...</Form.Label>
                    < Form.Control type='text' onChange={(e)=>{setName(e.target.value)}} name='name' />
                </ Form.Group >

            <Form.Group>
                < Form.Row >
                    < Col >
                        < Form.Label htmlFor='trait1' >Who is... </Form.Label>
                        < Form.Control type='text' onChange={(e)=>{setTrait1(e.target.value)}} name='trait1' />
                    </Col>

                    < Col >
                        < Form.Label htmlFor='trait2' > and </Form.Label>
                        < Form.Control type='text' onChange={(e)=>{setTrait2(e.target.value)}} name='trait2' />
                    </Col>
                </Form.Row>
            </Form.Group>

            <Form.Group>
                    < Form.Label htmlFor='profession' >My role on this ship is...</Form.Label>
                    < Form.Control type='text' onChange={(e)=>{setProfession(e.target.value)}} name='profession' />
            </Form.Group>

            <Form.Group>
                < Form.Row className='new-character-stat-row' >
                    < Form.Label className='col-1' htmlFor='irons' >Irons</Form.Label>
                    < Form.Check className='new-character-stat-column stat-col-1' onClick={(e)=>{setIrons(-1)}} inline label='-1' type='radio' name='irons' />
                    < Form.Check className='new-character-stat-column stat-col-2' onClick={(e)=>{setIrons(0)}}inline label='0' type='radio' name='irons' />
                    < Form.Check className='new-character-stat-column stat-col-3' onClick={(e)=>{setIrons(1)}}inline label='1' type='radio' name='irons' />
                    < Form.Check className='new-character-stat-column stat-col-4' onClick={(e)=>{setIrons(2)}}inline label='2' type='radio' name='irons' />
                </Form.Row>

                < Form.Row className='new-character-stat-row' >
                    < Form.Label className='col-1' htmlFor='hearts' >Hearts</Form.Label>
                    < Form.Check className='new-character-stat-column stat-col-1' onClick={(e)=>{setHearts(-1)}}inline label='-1' type='radio' name='hearts' />
                    < Form.Check className='new-character-stat-column stat-col-2' onClick={(e)=>{setHearts(0)}}inline label='0' type='radio' name='hearts' />
                    < Form.Check className='new-character-stat-column stat-col-3' onClick={(e)=>{setHearts(1)}}inline label='1' type='radio' name='hearts' />
                    < Form.Check className='new-character-stat-column stat-col-4' onClick={(e)=>{setHearts(2)}}inline label='2' type='radio' name='hearts' />
                </Form.Row>

                < Form.Row className='new-character-stat-row' >
                    < Form.Label className='col-1' htmlFor='veils' >Veils</Form.Label>
                    < Form.Check className='new-character-stat-column stat-col-1' onClick={(e)=>{setVeils(-1)}}inline label='-1' type='radio' name='veils' />
                    < Form.Check className='new-character-stat-column stat-col-2' onClick={(e)=>{setVeils(0)}}inline label='0' type='radio' name='veils' />
                    < Form.Check className='new-character-stat-column stat-col-3' onClick={(e)=>{setVeils(1)}}inline label='1' type='radio' name='veils' />
                    < Form.Check className='new-character-stat-column stat-col-4' onClick={(e)=>{setVeils(2)}}inline label='2' type='radio' name='veils' />
                </Form.Row>

                < Form.Row className='new-character-stat-row' >
                    < Form.Label className='col-1' htmlFor='mirrors' >Mirrors</Form.Label>
                    < Form.Check className='new-character-stat-column stat-col-1' onClick={(e)=>{setMirrors(-1)}}inline label='-1' type='radio' name='mirrors' />
                    < Form.Check className='new-character-stat-column stat-col-2' onClick={(e)=>{setMirrors(0)}}inline label='0' type='radio' name='mirrors' />
                    < Form.Check className='new-character-stat-column stat-col-3' onClick={(e)=>{setMirrors(1)}}inline label='1' type='radio' name='mirrors' />
                    < Form.Check className='new-character-stat-column stat-col-4' onClick={(e)=>{setMirrors(2)}}inline label='2' type='radio' name='mirrors' />
                </Form.Row>
            </Form.Group>

            <Form.Row>
                < Col >
                    < Form.Label htmlFor='integretity-1' >I love...</Form.Label>
                    < Form.Control type='text' onChange={(e)=>{setIntegrity1(e.target.value)}} name='integretity-1' />
                </Col>

                < Col >
                    < Form.Label htmlFor='integretity-2' >I hate...</Form.Label>
                    < Form.Control type='text' onChange={(e)=>{setIntegrity2(e.target.value)}} name='integretity-2' />
                </Col>
            </Form.Row>

            <Form.Row>
                < Col >
                    < Form.Label htmlFor='integretity-3' >I will always...</Form.Label>
                    < Form.Control type='text' onChange={(e)=>{setIntegrity3(e.target.value)}} name='integretity-3' />
                </Col>

                < Col >
                    < Form.Label htmlFor='integretity-4' >I will never...</Form.Label>
                    < Form.Control type='text' onChange={(e)=>{setIntegrity4(e.target.value)}} name='integretity-4' />
                </Col>
            </Form.Row>

            < Form.Row >
                < Form.Label htmlFor='integretity-4' >Anything else people should know... (Other players can see this!)</Form.Label>
                < Form.Control type='text' onChange={(e)=>{setPublicNotes(e.target.value)}} name='public-notes' />
            </Form.Row>

            < Form.Row >
                < Form.Label htmlFor='integretity-4' >Hidden Notes (Only you and your GM can see this)</Form.Label>
                < Form.Control type='text' onChange={(e)=>{setPrivateNotes(e.target.value)}} name='private-notes' />
            </Form.Row>

            < input type='submit' onClick={handleSubmit} />
            </ Form >
        </ Container >
    )
}

export default WriteCharacter