import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Col, Dropdown, Container } from 'react-bootstrap'
import jwt_decode from 'jwt-decode';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL
const axios = require('axios')

const EditCharacter = (props) => {

    const [name, setName] = useState(props.character.name)
    const [trait1, setTrait1] = useState(props.character.traits[0].desc)
    const [trait2, setTrait2] = useState(props.character.traits[1].desc)
    const [profession, setProfession] = useState(props.character.profession)
    const [irons, setIrons] = useState(props.character.irons)
    const [hearts, setHearts] = useState(props.character.hearts)
    const [veils, setVeils] = useState(props.character.veils)
    const [mirrors, setMirrors] = useState(props.character.mirrors)
    const [integrity1, setIntegrity1] = useState(props.character.integrities[0].desc)
    const [integrity2, setIntegrity2] = useState(props.character.integrities[1].desc)
    const [integrity3, setIntegrity3] = useState(props.character.integrities[2].desc)
    const [integrity4, setIntegrity4] = useState(props.character.integrities[3].desc)
    const [publicNotes, setPublicNotes] = useState(props.character.publicNotes)
    const [privateNotes, setPrivateNotes] = useState(props.character.privateNotes)

    const [error, setError] = useState(false)
    const [editChar, setEditChar] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Sending create character request...')
        console.log(props.currentUser)

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
            userId: props.currentUser._id
        }

        axios({            
            url: `${REACT_APP_SERVER_URL}character/edit/${props.character._id}`,
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }, 
            data: newChar
        })
        .then(res => {
            console.log('New character created')
            console.log(res)
            setEditChar(true)
        }).catch(res => {
            console.log(res)
            setError(true)
        })
    }

    let errorMsg = error ? <p>Error creating character</p> : null

    if (editChar) return <Redirect to={`/auth/myprofile`} />
    
    return (
        < Container >
            { errorMsg }
            < Form >
            <h1 className="title">Edit Character</h1>
                < Form.Group >
                    < Form.Label htmlFor='name' >I am...</Form.Label>
                    < Form.Control type='text' onChange={(e)=>{setName(e.target.value)}} value={name} name='name' />
                </ Form.Group >

            <Form.Group>
                < Form.Row >
                    < Col >
                        < Form.Label htmlFor='trait1' >Who is... </Form.Label>
                        < Form.Control type='text' onChange={(e)=>{setTrait1(e.target.value)}} value={trait1} name='trait1' />
                    </Col>

                    < Col >
                        < Form.Label htmlFor='trait2' > and </Form.Label>
                        < Form.Control type='text' onChange={(e)=>{setTrait2(e.target.value)}} value={trait2}name='trait2' />
                    </Col>
                </Form.Row>
            </Form.Group>

            <Form.Group>
                    < Form.Label htmlFor='profession' >My role on this ship is...</Form.Label>
                    < Form.Control type='text' onChange={(e)=>{setProfession(e.target.value)}} value={profession} name='profession' />
            </Form.Group>

            <Form.Group>
                < Form.Row className='new-character-stat-row' >
                    < Form.Label className='col-1' htmlFor='irons' >Irons</Form.Label>
                    < Form.Check className='new-character-stat-column stat-col-1' onClick={(e)=>{setIrons(-1)}} inline label='-1' type='radio' name='irons' />
                    < Form.Check className='new-character-stat-column stat-col-2' onClick={(e)=>{setIrons(0)}}inline label='0' type='radio' name='irons' />
                    < Form.Check className='new-character-stat-column stat-col-3' onClick={(e)=>{setIrons(1)}}inline label='1' type='radio' name='irons' />
                    < Form.Check className='new-character-stat-column stat-col-4' onClick={(e)=>{setIrons(2)}}inline label='2' type='radio' name='irons' />
                    < Form.Check className='new-character-stat-column stat-col-5' onClick={(e)=>{setIrons(3)}}inline label='3' type='radio' name='irons' />
                </Form.Row>

                < Form.Row className='new-character-stat-row' >
                    < Form.Label className='col-1' htmlFor='hearts' >Hearts</Form.Label>
                    < Form.Check className='new-character-stat-column stat-col-1' onClick={(e)=>{setHearts(-1)}}inline label='-1' type='radio' name='hearts' />
                    < Form.Check className='new-character-stat-column stat-col-2' onClick={(e)=>{setHearts(0)}}inline label='0' type='radio' name='hearts' />
                    < Form.Check className='new-character-stat-column stat-col-3' onClick={(e)=>{setHearts(1)}}inline label='1' type='radio' name='hearts' />
                    < Form.Check className='new-character-stat-column stat-col-4' onClick={(e)=>{setHearts(2)}}inline label='2' type='radio' name='hearts' />
                    < Form.Check className='new-character-stat-column stat-col-5' onClick={(e)=>{setHearts(3)}}inline label='3' type='radio' name='hearts' />
                </Form.Row>

                < Form.Row className='new-character-stat-row' >
                    < Form.Label className='col-1' htmlFor='veils' >Veils</Form.Label>
                    < Form.Check className='new-character-stat-column stat-col-1' onClick={(e)=>{setVeils(-1)}}inline label='-1' type='radio' name='veils' />
                    < Form.Check className='new-character-stat-column stat-col-2' onClick={(e)=>{setVeils(0)}}inline label='0' type='radio' name='veils' />
                    < Form.Check className='new-character-stat-column stat-col-3' onClick={(e)=>{setVeils(1)}}inline label='1' type='radio' name='veils' />
                    < Form.Check className='new-character-stat-column stat-col-4' onClick={(e)=>{setVeils(2)}}inline label='2' type='radio' name='veils' />
                    < Form.Check className='new-character-stat-column stat-col-5' onClick={(e)=>{setVeils(3)}}inline label='3' type='radio' name='veils' />
               
                </Form.Row>

                < Form.Row className='new-character-stat-row' >
                    < Form.Label className='col-1' htmlFor='mirrors' >Mirrors</Form.Label>
                    < Form.Check className='new-character-stat-column stat-col-1' onClick={(e)=>{setMirrors(-1)}}inline label='-1' type='radio' name='mirrors' />
                    < Form.Check className='new-character-stat-column stat-col-2' onClick={(e)=>{setMirrors(0)}}inline label='0' type='radio' name='mirrors' />
                    < Form.Check className='new-character-stat-column stat-col-3' onClick={(e)=>{setMirrors(1)}}inline label='1' type='radio' name='mirrors' />
                    < Form.Check className='new-character-stat-column stat-col-4' onClick={(e)=>{setMirrors(2)}}inline label='2' type='radio' name='mirrors' />
                    < Form.Check className='new-character-stat-column stat-col-5' onClick={(e)=>{setMirrors(3)}}inline label='3' type='radio' name='mirrors' />
                </Form.Row>
            </Form.Group>

            <Form.Row>
                < Col >
                    < Form.Label htmlFor='integretity-1' >I love...</Form.Label>
                    < Form.Control type='text' onChange={(e)=>{setIntegrity1(e.target.value)}} value={integrity1} name='integretity-1' />
                </Col>

                < Col >
                    < Form.Label htmlFor='integretity-2' >I hate...</Form.Label>
                    < Form.Control type='text' onChange={(e)=>{setIntegrity2(e.target.value)}} value={integrity2} name='integretity-2' />
                </Col>
            </Form.Row>

            <Form.Row>
                < Col >
                    < Form.Label htmlFor='integretity-3' >I will always...</Form.Label>
                    < Form.Control type='text' onChange={(e)=>{setIntegrity3(e.target.value)}} value={integrity3} name='integretity-3' />
                </Col>

                < Col >
                    < Form.Label htmlFor='integretity-4' >I will never...</Form.Label>
                    < Form.Control type='text' onChange={(e)=>{setIntegrity4(e.target.value)}} value={integrity4} name='integretity-4' />
                </Col>
            </Form.Row>

            < Form.Row >
                < Form.Label htmlFor='integretity-4' >Anything else people should know... (Other players can see this!)</Form.Label>
                < Form.Control type='text' onChange={(e)=>{setPublicNotes(e.target.value)}} value={publicNotes} name='public-notes' />
            </Form.Row>

            < Form.Row >
                < Form.Label htmlFor='integretity-4' >Hidden Notes (Only you and your GM can see this)</Form.Label>
                < Form.Control type='text' onChange={(e)=>{setPrivateNotes(e.target.value)}} value={privateNotes} name='private-notes' />
            </Form.Row>

            < input type='submit' className="button long-button" onClick={handleSubmit} />
            </ Form >
        </  Container >
    )
}

export default EditCharacter