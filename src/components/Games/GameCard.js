import React from 'react'

const GameCard = (props) => {

    return (
        <div className='container'>
            {props.game.title}
        </div>
    )
}

export default GameCard