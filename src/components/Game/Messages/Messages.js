import React from 'react'
import Message from './Message'

const Messages = (props) => {

    let messageList 
    console.log('Messages')
    console.log(props.messages)

    if (props.messages) {
        messageList = props.messages.map((message, i) => {
            return < Message message={message} key={`msg-${i}`} />
        })
    }

    return (
        <div>
            {messageList}
        </div>
    )
}

export default Messages