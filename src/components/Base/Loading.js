import React from 'react'
import { Redirect } from 'react-router-dom'

const Loading = (props) => {

    if (props.currentUser && props.currentUser.characters[0].name) return <Redirect to="/auth/myprofile" currentUser={props.currentUser} />

    return (
        <div>
            <h1>LOADING LOADING LOADING</h1>
        </div>
    )
}

export default Loading