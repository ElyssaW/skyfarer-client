import React from 'react'

const Message = (props) => {

    let editDelete

    if (props.message.userId === props.currentUser._id) {
        editDelete = <span>Edit - Delete - </span>
    }

    return (
        <div>
            
            <h6>{props.message.body}</h6>
            <p>{props.message.userId} - {editDelete}</p>

        </div>
    )
}

export default Message