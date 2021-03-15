import React from 'react'

const playerCharacters = (props) => {

    console.log('Creating online user list')
    let charactersList = []
    for (const characterId in props.playerCharacters) {
        let character = props.playerCharacters[characterId]
        
        charactersList.push(<p>{character.name} 
        (Played by <span>{props.onlineUsers[character.userId].username})</span>
        </p>) 
    }

    return (
        <div>
            <p>Current Characters</p>
            {charactersList} 
        </div>
    )
}

export default playerCharacters