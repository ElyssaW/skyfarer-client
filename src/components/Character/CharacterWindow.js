import React from 'react'

const CharacterWindow = (props) => {

    let inDanger = props.character && props.character.inDanger ? <span>(In Danger!)</span> : null

    let characterDisplay = props.character ? (
        <>
            <div className='character-window-head-section'>
                <div className='character-window-title'>
                    <h4 className='title inline character-title'>{props.character.name}</h4><span className='in-danger red'>{inDanger}</span>
                </div>
                <p className='character-window-subtitle'>A {props.character.traits[0].desc}, {props.character.traits[1].desc} {props.character.profession}</p>
            </div>

            <h6 className='subtitle sidebar-subtitle clipped'>Stats</h6>
            <div className='sidebar-subsection'>
                <div className='stat-bank'>
                    <span>Irons: {props.character.irons}</span> 
                    <span>Hearts: {props.character.hearts}</span>
                    <span>Mirros: {props.character.mirrors}</span>
                    <span>Veils: {props.character.veils}</span>
                </div>

                <div className='stat-bank'>
                    <span>Peril: <span className='red'>{props.character.peril}</span></span> <span>Tenacity: {props.character.tenacity}</span>
                </div>
            </div>

            { props.character.integrities ? (
            <>
                <h6 className='subtitle sidebar-subtitle clipped'>Integrities</h6>
                <div className='sidebar-subsection'>
                    {props.character.integrities.map(integrity => {
                        return <p>{integrity.desc}</p>
                    })}
                </div> 
            </>) : null
            }

            { props.character.conditions ? (
            <>
                <h6 className='subtitle sidebar-subtitle clipped'>Conditions</h6>
                <div className='sidebar-subsection'>
                    {props.character.conditions.map(condition => {
                        return <p>{condition.desc}</p>
                    })}
                </div> 
            </>) : null
            }
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