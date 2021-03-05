import React from 'react'
import { Link } from 'react-router-dom'

const Character = () => {

    return (
        <div>
            Character page
            < Link to='/character/new' >New character</Link>
        </div>
    )
}

export default Character