import React from 'react'
import { Link } from 'react-router-dom'

const CharacterCard = (props) => {

    let inDanger = props.character && props.character.inDanger ? <span>
    (In Danger! 
    <span onClick={props.removeDanger}> X </span>)
    </span> : null

    return (
        <div className='card-container'>
            <div className='character-window-head-section'>
                    <div className='character-window-title'>
                        <h4 className='title inline character-title'>{props.character.name}</h4><span className='in-danger red'>{inDanger}</span>
                    </div>
                    <p className='character-window-subtitle'>A {props.character.traits[0].desc}, {props.character.traits[1].desc} {props.character.profession}</p>

                    < Link to={`/character/view/${props.character._id}`} ><button className='button'>View Character</button></Link>
                    < Link to={`/character/edit/${props.character._id}`} ><button className='button'>Edit Character</button></Link>
                </div>
        </div>
    )
}

export default CharacterCard