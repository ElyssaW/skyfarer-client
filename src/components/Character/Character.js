import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
const axios = require('axios')

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const Character = (props) => {

    const [character, setCharacter] = useState(null)

    useEffect(() => {
        console.log('Retrieving character...')
        axios(`${SERVER_URL}character/view/${props.characterId}`)
        .then(res => {
            console.log(res.data)
            setCharacter(res.data)
        }, [])
    })

    return (
        <div>
            Character page
            Name: {character.name}
            Irons: {character.irons}
            Hearts: {character.hearts}
            Mirros: {character.mirrors}
            Veils: {character.veils}
            < Link to='/character/new' >New character</Link>
        </div>
    )
}

export default Character