import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import CharacterWindow from '../../Character/CharacterWindow'
import OnlineUsers from './OnlineUsers'

const LeftSidebar = (props) => {

    const handlePlayingAs = (e) => {
        console.log('Handling playing as')
        console.log(props.userCharacters)
        if (e.target.value) {
            props.setNewPlayingAs(props.userCharacters[e.target.value])
        }
    }

    const handleTenacitySpent = () => {
        console.log('Spending tenacity')
        if (props.playingAs.tenacity > 0 && 
            props.playingAs.peril > 0) {
            let tempChar = props.playingAs
            tempChar.tenacity--
            tempChar.peril--
            props.updatePlayingAs(tempChar)
            props.pushUpdate('Updating...')
        }
    }

    const handleAddPeril = () => {
        console.log('Adding peril')
        if (props.playingAs.peril < 10) {
            let tempChar = props.playingAs
            tempChar.peril++
            props.updatePlayingAs(tempChar)
            props.pushUpdate('Updating...')
        }
    }

    const handleAddTenacity = () => {
        console.log('Adding tenacity')
        if (props.playingAs.tenacity < props.playingAs.tenacityMax) {
            let tempChar = props.playingAs
            tempChar.tenacity++
            props.updatePlayingAs(tempChar)
            props.pushUpdate('Updating...')
        }
    }
    
    let dropDownOptions = []
    if (props.userCharacters) {
        for (const char in props.userCharacters) {
            dropDownOptions.push(
                <option value={char}>{props.userCharacters[char].name}</option>
            )
        }
    }

    let perilTenacity = props.playingAs ? (
        <div className='sidebar-button-bank'>
        < button onClick={handleTenacitySpent} className='button' >Lower Peril</button>
        < button onClick={handleAddPeril} className='button' >Raise Peril</button>
        < button onClick={handleAddTenacity} className='button' >Raise Tenacity</button>
        </div>
    ) : null

    return (
        <div>
            <CharacterWindow character={props.playingAs} />

            {perilTenacity}
                    
            <Form.Group className='character-select'  controlId="exampleForm.SelectCustom">
                <Form.Control as="select" onChange={(e) => {handlePlayingAs(e)}} value={props.playingAs} custom>
                    <option value={''}> {props.playingAs ? props.playingAs.name : 'Select character' }</option>
                    {dropDownOptions}
                    <option value={''}>Guest</option>
                </Form.Control>
            </Form.Group>
        </div>
    )
}

export default LeftSidebar