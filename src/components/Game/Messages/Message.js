import React from 'react'

const Message = (props) => {

    let editDelete = props.message.userId === props.currentUser._id ? (
        <span>
            <span onClick={() => {props.handleEdit(props.message, props.index)}}>Edit</span> - 
            <span onClick={() => {props.handleDelete(props.message, props.index)}}>Delete</span> - 
        </span> ) : null

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