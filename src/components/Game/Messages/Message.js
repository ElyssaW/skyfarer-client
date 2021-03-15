import React from 'react'

const Message = (props) => {

    let editDelete = props.currentUser && props.message.userId === props.currentUser._id ? (
        <span>
            <span onClick={() => {props.handleEdit(props.message, props.index)}}>Edit</span> - 
            <span onClick={() => {props.handleDelete(props.message, props.index)}}> Delete</span> 
        </span> ) : null

    let ooc = props.message.ooc ?
        <span>(Out of Character!)</span> : null

    let gm = props.message.gmOnly ?
        <span>(GM Only)</span> : null

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
        <div>
            
            {ooc}{gm}
            <h6><span dangerouslySetInnerHTML={{ __html: props.message.body }} />{rolls}</h6>
            <p>{props.message.username} {editDelete}</p>

        </div>
    )
}

export default Message