import React from 'react'

import './Message.css'

function Message({message: {username,text},name}) {
    let isSentByCurrentUser = false;
    console.log(name);
    console.log(username);

    const trimName = name.trim().toLowerCase();
    if(username === trimName) {
        isSentByCurrentUser = true;
    }
   
    return (
        isSentByCurrentUser
        ? (
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{trimName}</p>
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{text}</p>
                </div>
            </div>
        )
        : (
            <div className="messageContainer justifyStart">
                
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{text}</p>
                </div>
                <p className="sentText pl-10">{username}</p>
            </div>
        )
            

        
    )
}

export default Message
