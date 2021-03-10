import React from 'react'
import { Link } from 'react-router-dom'

const Profile = (props) => {

    const userData = props.user ? (
        <div>
            <h1>Profile</h1>
            <p>Name: {props.currentUser.name}</p>

            { props.currentUser.games && props.currentUser.games.length > 0 ? 
                (<>
                    <p>Characters</p>
                    {props.currentUser.characters ? props.currentUser.characters.map(character => {
                        return <p>{character.name} < Link to={`/character/view/${character._id}`} ><button>View character</button></Link></p>
                    }) : null}

                    <Link to='/character/new'><button>Make new character</button></Link>
                </>) : null
            }

            <p>Games</p>
            {props.currentUser.games ? props.currentUser.games.map(game => {
                return <p>{game.title}< Link to={`/game/${game._id}`} ><button>Go to Game</button></Link></p>
            }) : null }

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