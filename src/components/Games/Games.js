import React from 'react'
import GameCard from './GameCard'

const Games = (props) => {

    let games = []

    for (const game in props.gamesData) {
        games.push(
            < GameCard game={props.gamesData[game]} key={`game-${game}`} />
        )
    }

    return (
        <div >
            Find a game
            {games}
        </div>
    )
}

export default Games