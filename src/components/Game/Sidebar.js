import React from 'react'
import { Form } from 'react-bootstrap'
import CharacterWindow from '../Character/CharacterWindow'

const Sidebar = (props) => {

    const handlePlayingAs = (e) => {
        console.log('Handling playing as')
        console.log(props.userCharacters)
        if (e.target.value) {
            props.updatePlayingAs(props.userCharacters[e.target.value])
        }
    }

    const handleTenacitySpent = () => {
        console.log('Spending tenacity')
        let tempChar = props.playingAs
        tempChar.tenacity--
        tempChar.peril--
        props.updatePlayingAs(tempChar)
        props.pushUpdate('Updating...')
    }

    let dropDownOptions = []
    if (props.userCharacters) {
        for (const char in props.userCharacters) {
            dropDownOptions.push(
                <option value={char}>{props.userCharacters[char].name}</option>
            )
        }
    }

    const handleAddPeril = () => {
        console.log('Adding peril')
        let tempChar = props.playingAs
        tempChar.tenacity++
        tempChar.peril++
        console.log(tempChar)
        props.updatePlayingAs(tempChar)
        props.pushUpdate('Updating...')
    }

    let spendTenacity = props.playingAs && props.playingAs.tenacity > 0 && props.playingAs.peril > 0 ?
        (<div>
            < button onClick={handleTenacitySpent} className='button' >Lower Peril</button>
        </div> ) : null

    let addPeril = <div>
    < button onClick={handleAddPeril} className='button' >Raise Peril</button>
</div>

    return (
        <>
            <CharacterWindow character={props.playingAs} />

            {spendTenacity}
            {addPeril}
                    
            <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label className='subtitle'>Playing As...</Form.Label>

                <Form.Control as="select" onChange={(e) => {handlePlayingAs(e)}} value={props.playingAs} custom>
                    <option value={''}> {props.playingAs ? props.playingAs.name : 'Select character' }</option>
                    {dropDownOptions}
                    <option value={''}>Guest</option>
                </Form.Control>
            </Form.Group>
        </>
    )
}

export default Sidebar