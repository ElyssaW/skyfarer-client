import React, { useEffect, useState } from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import CharacterCard from './CharacterCard'
import GameCard from './GameCard'
import { Link } from 'react-router-dom'

const Profile = (props) => {

    let userData = <p>Loading...</p>

    let charactersList = props.currentUser.characters ? props.currentUser.characters.map((character, i) => {
        return < CharacterCard character={character} />
    }) : null

    let gameList = props.currentUser.games ? props.currentUser.games.map((game, i) => {
        return ( 
            <>
                < GameCard game={game} />
            </>
        )
    }) : null
    
    if (props.currentUser) {
        userData = 
        <Container className='profile-div'>
            <h1>Welcome back, {props.currentUser.name}</h1>

            < Row >
                < Col >
                    <h2>Characters</h2>

                    {charactersList}

                    <Link to='/character/new'><button className='button'>Make new character</button></Link>
                </Col>
                < Col >
                    <h2>Games</h2>
                    
                    {gameList}

                    <Link to='/game/new'><button className='button'>Make new game</button></Link>
                </Col>
            </Row>
        </Container>
    }

    return (
        <>
            {userData}
        </>
    )
}

export default Profile