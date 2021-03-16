import React, { useEffect, useState } from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Profile = (props) => {

    let userData = <p>Loading...</p>
    
    if (props.currentUser) {
        userData = 
        <Container className='profile-div'>
            <h1>Welcome back, {props.currentUser.name}</h1>

            < Row >
                < Col >
                    <h2>Characters</h2>
                    {props.currentUser.characters ? props.currentUser.characters.map((character, i) => {
                        return <p key={`character-${i}`}>{character.name} < Link to={`/character/view/${character._id}`} key={`character-link-${i}`} ><button className='button'>View character</button></Link></p>
                    }) : null}

                    <Link to='/character/new'><button className='button'>Make new character</button></Link>
                </Col>
                < Col >
                    <h2>Games</h2>
                    {props.currentUser.games ? props.currentUser.games.map((game, i) => {
                        return <p key={`game-${i}`}>{game.title}< Link to={`/game/view/${game._id}`} key={`game-link-${i}`} ><button className='button'>Go to Game</button></Link></p>
                    }) : null }

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