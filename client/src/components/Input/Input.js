import React from 'react'
import './Input.css'

function Input({message,setMessage,sendMessage}) {
    return (
        <form className="form">
            <input
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={event => event.key === 'Enter' ? setMessage(event) : null}
            />
            <button className="sendMessage" onClick={(event) => sendMessage(event)}>Send</button>
        </form>
    )
}

export default Input
