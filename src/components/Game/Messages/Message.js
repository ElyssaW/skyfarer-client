import React from 'react'

const Message = (props) => {

    let editDelete = props.currentUser && props.message.userId === props.currentUser._id ? (
        <span className='edit-delete'>
            <span onClick={() => {props.handleEdit(props.message, props.index)}}> | edit</span> - 
            <span onClick={() => {props.handleDelete(props.message, props.index)}}> delete</span> 
        </span> ) : null

    let ooc = props.message.ooc ?
        <span> (Out of Character!)</span> : null

    let gm = props.message.gmOnly ?
        <span>(GM Only) </span> : null

    let rolls = props.message.rolls ?
        props.message.rolls.map((roll, i) => {
            if (roll) {
                if (roll.stat == 'peril' || roll.stat == 'tenacity') {
                    return <span key={`roll-${props.index}-${i}`}> | {roll.stat}: {roll.roll}</span>
                } else {
                    if (roll.hasSecond) {
                        return <span key={`roll-${props.index}-${i}`}> | {roll.stat}: {roll.roll + roll.bonus} (Rolled {roll.roll} and {roll.secondRoll} + {roll.bonus})</span>
                    } else {
                        return <span key={`roll-${props.index}-${i}`}> | {roll.stat}: {roll.roll + roll.bonus} (Rolled {roll.roll} + {roll.bonus})</span>
                    }
                }
            }
        }) : null

    return (
        <>        
            <div className='message-main'>
                <p className='message-small'>{gm}{ooc}</p>
                <h6 className='message-body'><span dangerouslySetInnerHTML={{ __html: props.message.body }} />{rolls} {editDelete}</h6>
            </div>
        </>
    )
}

export default Message