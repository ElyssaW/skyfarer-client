import React from 'react'
const REACT_APP_CLIENT_URL = process.env.REACT_APP_CLIENT_URL

const GameInfo = (props) => {

    return (
        <div>
            <h2 className='character-window-title'>{props.gameState.title}</h2>
            <p className='character-window-subtitle'>{props.gameState.desc}</p>

            <div>
                <h4 className='subtitle sidebar-subtitle-left clipped-left'>Invite</h4>
                <p className='sidebar-subsection-left'>Invite new friends with this link: <div className='invite-link'>{`${REACT_APP_CLIENT_URL}game/invite/${props.gameState._id}`}</div></p>
            </div>

            <h4 className='subtitle sidebar-subtitle-left clipped-left'>Tags</h4>
            <p className='sidebar-subsection-left'>Tags: {props.gameState.tags.join(', ')}</p>
        </div>
    )
}

export default GameInfo