import React from 'react'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const GameInfo = (props) => {

    return (
        <div>
            <h2 className='character-window-title'>{props.gameState.title}</h2>
            <p className='character-window-subtitle'>{props.gameState.desc}</p>

            <div>
                <h4 className='subtitle sidebar-subtitle clipped'>Invite</h4>
                <p className='sidebar-subsection'>Invite new friends with this link: <div className='invite-link'>{`${REACT_APP_SERVER_URL}game/${props.gameState._id}`}</div></p>
            </div>

            <h4 className='subtitle sidebar-subtitle clipped'>Tags</h4>
            <p className='sidebar-subsection'>Tags: {props.gameState.tags.join(', ')}</p>
        </div>
    )
}

export default GameInfo