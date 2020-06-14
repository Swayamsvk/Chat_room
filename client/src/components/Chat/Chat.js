import React,{useState,useEffect} from 'react'
import queryString from 'query-string';
import io from 'socket.io-client'
import './Chat.css';

let socket;

function Chat({location}) {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name,room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        console.log(socket);
    },[ENDPOINT,location.search])

    return (
        <div>
            
        </div>
    )
}

export default Chat
