import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import CharacterWindow from './CharacterWindow'
import EditCharacter from './EditCharacter'
const axios = require('axios')

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Character = (props) => {

    const [character, setCharacter] = useState(null)
    const [editing, setEditing] = useState(false)

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

    let characterDisplay = editing && character ? (
        <div>
            < EditCharacter 
                character={character}
                currentUser={props.currentUser}
            />
        </div>
    ) : character ? (
        <div>
            < CharacterWindow character={character} />
            < Link to='/character/new' >New character</Link>
            < button onClick={() => setEditing(true)} >Edit character</button>
            < Link to='/auth/myprofile' >< button onClick={handleDelete} >Delete character</button></Link>
        </div>
    ) : null

    return (
        <>
            {characterDisplay}
        </>
    ) 
}

export default Character