import React from 'react'
import { Link } from 'react-router-dom'

const Profile = (props) => {

    const userData = props.user ? (
        <div>
            <h1>Profile</h1>
            <p>Name: {props.currentUser.name}</p>

            <p>Characters</p>
            {props.currentUser.characters.map(character => {
                return <p>{character.name}</p>
            })}

            <Link to='/character/new'><button>Make new character</button></Link>

            <p>Games</p>
            {props.currentUser.games.map(game => {
                <p>{game.title}</p>
            })}

            <Link to='/game/new'><button>Make new game</button></Link>
        </div>
    ) : (
        <p>Loading...</p>
    )

    return (
        <>
            {userData}
        </>
    )
}

export default Profile