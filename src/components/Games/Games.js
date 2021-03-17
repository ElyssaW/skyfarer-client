import React from 'react'
import { Container } from 'react-bootstrap'
import GameCard from '../Profile/GameCard'

const Games = (props) => {

    let games = []

    for (const game in props.gamesData) {
        games.push(
            < GameCard game={props.gamesData[game]} key={`game-${game}`} />
        )
    }

    return (
        <Container >
            Find a game
            {games}
        </Container>
    )
}

export default Games