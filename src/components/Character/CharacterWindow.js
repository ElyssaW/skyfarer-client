import React from 'react'

const CharacterWindow = (props) => {

    let characterDisplay = props.character ? (
        <>
            <h4>Name: {props.character.name}</h4>
            <p>Irons: {props.character.irons}</p>
            <p>Hearts: {props.character.hearts}</p>
            <p>Mirros: {props.character.mirrors}</p>
            <p>Veils: {props.character.veils}</p>
        </>
    ) : (
        <>
            <h4>Name: Guest</h4>
            <p>Create a character to participate in the game!</p>
        </>
    )

    return (
        <div>
            {characterDisplay}
        </div>
    )
}

export default CharacterWindow