import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Profile = (props) => {

    let userData = <p>Loading...</p>
    
    if (props.currentUser) {
        userData = 
        <div>
            <h1>Profile</h1>
            <p>Name: {props.currentUser.name}</p>

            {console.log(props.currentUser.characters)}
            <p>Characters</p>
            {props.currentUser.characters ? props.currentUser.characters.map((character, i) => {
                return <p key={`character-${i}`}>{character.name} < Link to={`/character/view/${character._id}`} key={`character-link-${i}`} ><button>View character</button></Link></p>
            }) : null}

            <Link to='/character/new'><button>Make new character</button></Link>

            <p>Games</p>
            {props.currentUser.games ? props.currentUser.games.map((game, i) => {
                return <p key={`game-${i}`}>{game.title}< Link to={`/game/${game._id}`} key={`game-link-${i}`} ><button>Go to Game</button></Link></p>
            }) : null }

            <Link to='/game/new'><button>Make new game</button></Link>
        </div>
    }

    return (
        <>
            {userData}
        </>
    )
}

export default Profile