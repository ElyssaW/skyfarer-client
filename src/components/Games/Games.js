import React from 'react'
import GameCard from './GameCard'

const Games = (props) => {

    let games = props.gamesData.map((game, i) => {
        return < GameCard game={game} key={`game-${i}`} />
    })

    return (
        <div >
            Find a game
            {games}
        </div>
    )
}

export default Games