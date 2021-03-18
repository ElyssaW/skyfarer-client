import React, { useEffect, useState } from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import CharacterCard from './CharacterCard'
import GameCard from './GameCard'
import Message from '../Game/Messages/Message'
import { Link } from 'react-router-dom'

const Profile = (props) => {

    let userData = <p>Loading...</p>

    let charactersList = props.currentUser && props.currentUser.characters ? props.currentUser.characters.map((character, i) => {
        return < CharacterCard character={character} />
    }) : null

    let gameList = props.currentUser && props.currentUser.games ? props.currentUser.games.map((game, i) => {
        return ( 
            <>
                < GameCard game={game} />
            </>
        )
    }) : null


    let messageBlock = []
    let messageList = []
    if (props.currentUser && props.currentUser.messages) {
        props.currentUser.messages.forEach((message, index) => {
            messageBlock.push(
                <div className='flex-fill flex-center'>
                    <div className='profile-message-single'>
                    < Message
                        message={message}
                        currentUser={props.currentUser}
                        gameState={props.gamesData[message.gameId]}
                        index={index}
                        key={`message-${index}`}
                    />
                    </div>

                    <span className='message-go-to button'>
                    <Link to={`/game/view/${message.gameId}`}>Go To Game</Link>
                    </span>
                </div>
            )
    
            if (!props.currentUser.messages[index+1] || props.currentUser.messages[index+1].characterName != message.characterName) {
                messageList.push(
                    <div>
                        <div><b>{ 
                            message.characterName ? 
                            (<>
                            {message.characterName} ({message.username})
                            </>) : (<>
                            {message.username}
                            </>) }
                        </b></div>
                        {messageBlock}
                    </div>
                )
                messageBlock = []
            }
        })
    }
    
    if (props.currentUser) {
        console.log('User messages')
        console.log(props.currentUser.messages)
        userData = 
        <Container>
            <h1>Welcome back, {props.currentUser ? props.currentUser.name : null}</h1>

            < Row className='profile-row' >
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

            < Row className='profile-row message-row' >
                <div className='profile-message-div'>

                <h2 className='ribbon'>Messages</h2>
                <div className='single-message-div profile-message-div drop-shadow'>
                    {messageList}
                </div>
                </div>
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