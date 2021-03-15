import React from 'react'

const ChatCommands = (props) => {

    return (
        <div>
            Chat info
            <p>Roll stats with ![stat name] (For example: !veils)</p>
            <p>Roll with advantage by typing 'x2' after a roll (!veilsx2)</p>
            <p>Add or subtract bonuses with "+trait" or "-trait" (!veilsx2+trait or !irons+trait+trait)</p>
            <p>Write an Out of Character message with !ooc</p>
            <p>Whisper to the GM with !gm</p>
        </div>
    )
}

export default ChatCommands