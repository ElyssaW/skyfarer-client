import React from 'react'

const ChatCommands = (props) => {

    return (
        <div>
            <h2 className='character-window-title'>Chat info</h2>
            <div className='sidebar-chat-help'>
                <p className='chat-help'>Roll stats with ![stat name]</p>
                <p className='muted chat-example'><b>!irons</b> This will roll a d10 + my Irons stat</p>
            </div>

            <div className='sidebar-chat-help'>
                <p className='chat-help'>Roll with advantage by typing 'x2' after a roll</p>
                <p className='muted chat-example'><b>!heartsx2</b> This will roll hearts with advantage</p>
            </div>

            <div className='sidebar-chat-help'>
                <p className='chat-help'>Add or subtract bonuses with "+trait" or "-trait"</p>
                <p className='muted chat-example'><b>!veils+trait-trait</b> This will give me a bonus of my veils + 1 - 1</p>
            </div>

            <div className='sidebar-chat-help'>
                <p className='chat-help'>Write an Out of Character message with !ooc</p>
                <p className='muted chat-example'><b>!ooc</b> This message is from me, not my character</p>
            </div>

            <div className='sidebar-chat-help'>
                <p className='chat-help'>Whisper to the GM with !gm</p>
                <p className='muted chat-example'><b>!gm</b> Only you and your GM can see this</p>
            </div>

            <div className='sidebar-chat-help'>
                <p className='chat-help'>Style text with </p>
                <p className='muted chat-example flex-fill'>
                    <b>&lt;b&gt;bold&lt;/b&gt;</b> 
                    <i>&lt;i&gt;italic&lt;/i&gt;</i> 
                    <span>&lt;s&gt;<s>lined</s>&lt;/s&gt;</span>
                </p>
            </div>
        </div>
    )
}

export default ChatCommands