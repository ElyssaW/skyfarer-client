import React, { useEffect, useRef } from 'react'
import Message from './Message'

const Messages = (props) => {

    let messageList = props.messages ? props.messages.map((message, index) => {
            if (message.gmOnly && props.gameState && (props.currentUser._id === props.gameState.gm || message.userId === props.currentUser._id)) {
                return (
                < Message message={message} currentUser={props.currentUser} handleEdit={props.handleEdit} handleDelete={props.handleDelete} index={index} key={`message-${index}`} />)
            } else if (!message.gmOnly) {
                return < Message message={message} currentUser={props.currentUser} handleEdit={props.handleEdit} handleDelete={props.handleDelete} index={index} key={`message-${index}`} />
            }
        })
    : null

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef()
        useEffect(() => elementRef.current.scrollIntoView())
        return <div ref={elementRef} />
      }

    return (
        <div className='messages'>
            {messageList}
            < AlwaysScrollToBottom />
        </div>
    )
}

export default Messages