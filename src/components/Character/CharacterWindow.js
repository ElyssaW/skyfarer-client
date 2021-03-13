import React from 'react'

const CharacterWindow = (props) => {

    let characterDisplay = props.character ? (
        <>
            <h4 className='title'>{props.character.name}</h4>
            <p>Who is {props.character.traits[0].desc} and {props.character.traits[1].desc}</p>

            <h6 className='subtitle'>Stats</h6>
            <p>Irons: {props.character.irons} | Hearts: {props.character.hearts}</p>
            <p>Mirros: {props.character.mirrors} | Veils: {props.character.veils}</p>

            <h6 className='subtitle'>Integrities</h6>
            <p>
                <span>
                    {props.character.integrities[0].desc} {' | '}
                </span>
                <span>
                    {props.character.integrities[1].desc}
                </span>
            </p>
            <p>
                <span>
                    {props.character.integrities[2].desc} {' | '}
                </span>
                <span>
                    {props.character.integrities[3].desc}
                </span>
            </p>
            <p>
                Peril: {props.character.peril} | Tenacity: {props.character.tenacity}
            </p>
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