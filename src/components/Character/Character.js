import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
const axios = require('axios')

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Character = (props) => {

    const [character, setCharacter] = useState(null)

    useEffect(() => {
        console.log('Retrieving character...')
        console.log(props.characterId)
        axios(`${REACT_APP_SERVER_URL}character/view/${props.characterId}`)
        .then(res => {
            console.log(res.data)
            setCharacter(res.data)
        }, [])
    }, [])

    const handleDelete = () => {
        console.log('Handling delete')
        axios({
            url: `${REACT_APP_SERVER_URL}character/delete/${props.characterId}`,
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
        .then(res => {
            console.log(res)
        })
    }

    const profileData = character ? (
        <div>
            <p>Character page</p>
            <p>Name: {character.name}</p>
            <p>Irons: {character.irons}</p>
            <p>Hearts: {character.hearts}</p>
            <p>Mirros: {character.mirrors}</p>
            <p>Veils: {character.veils}</p>
            < Link to='/character/new' >New character</Link>
            < Link to='/auth/myprofile' >< button onClick={handleDelete} >Delete character</button></Link>
        </div>
    ) :(
        <p>Loading...</p>
    )

    return (
        <div>
            {profileData}
        </div>
    )
}

export default Character