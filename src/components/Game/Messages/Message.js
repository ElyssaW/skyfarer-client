import React from 'react'

const Message = (props) => {

    let editDelete = props.message.userId === props.currentUser._id ?
        <span>Edit - Delete - </span> : null

    let ooc = props.message.ooc ?
        <span>(Out of Character!)</span> : null

    return (
        <div>
            {ooc}
            <h6>{props.message.body}</h6>
            <p>{props.message.username} - {editDelete}</p>

        </div>
    )
}

export default Message