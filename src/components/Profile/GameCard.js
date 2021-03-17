import React from 'react'
import { Link } from 'react-router-dom'

const GameCard = (props) => {

    let tagList = props.game && props.game.tags ? props.game.tags.map(tag => {
        return <span>{tag}, </span>
    }) : null

    return (
        <div className='card-container'>
            <div className='character-window-head-section'>
                <div className='character-window-title'>
                    <h4 className='title inline character-title'>{props.game.title}</h4>
                </div>
                <p className='character-window-subtitle'>
                {tagList}</p>
            </div>

            < Link to={`/game/view/${props.game._id}`} ><button className='button'>Go to Game</button></Link>
        </div>
    )
}

export default GameCard