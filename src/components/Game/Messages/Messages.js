import React from 'react'
import Message from './Message'

const Messages = (props) => {

    let messageList = props.messages.map(message => {
        return < Message message={message} />
    })

    return (
        <div>
            {messageList}
        </div>
    )
}

export default Messages