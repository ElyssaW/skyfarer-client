import React from 'react'
import Message from './Message'

const Messages = (props) => {

    let messageList = props.messages ? props.messages.map((message, index) => {
            return < Message message={message} currentUser={props.currentUser} handleEdit={props.handleEdit} handleDelete={props.handleDelete} index={index} key={`message-${index}`} />
        })
    : null

    return (
        <div>
            {messageList}
        </div>
    )
}

export default Messages