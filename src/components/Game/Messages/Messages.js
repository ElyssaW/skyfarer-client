import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Message from './Message'

const Messages = (props) => {

    let messageList = []
    let messageBlock = []
    
    if(props.messages) {
            props.messages.forEach((message, index) => {

            if (message.gmOnly && props.gameState && (props.currentUser._id === props.gameState.gm || message.userId === props.currentUser._id)) {
                messageBlock.push(
                < Message message={message} currentUser={props.currentUser} handleEdit={props.handleEdit} handleDelete={props.handleDelete} index={index} key={`message-${index}`} />)
            } else if (!message.gmOnly) {
                messageBlock.push(< Message message={message} currentUser={props.currentUser} handleEdit={props.handleEdit} handleDelete={props.handleDelete} index={index} key={`message-${index}`} />)
            }

            if (!props.messages[index+1] || props.messages[index+1].userId != message.userId || props.messages[index+1].characterName != message.characterName) {
                messageList.push(
                    <div className='single-message-div'>
                        <div><b>{ 
                            message.characterName ? 
                            (<>
                            {message.characterName} ({message.username})
                            </>) : (<>
                            {message.username}
                            </>) }
                        </b></div>
                        {messageBlock}
                    </div>
                )
                messageBlock = []
            }
        })
    }

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