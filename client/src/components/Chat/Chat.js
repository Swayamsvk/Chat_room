import React,{useState,useEffect} from 'react'
import queryString from 'query-string';
import io from 'socket.io-client'
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

function Chat({location}) {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const ENDPOINT = 'localhost:3001';

    useEffect(() => {
        const { name,room } = queryString.parse(location.search);
        console.log(name,room);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        console.log(socket);

        //Join chatroom
        socket.emit('joinRoom', { name,room });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    
    },[ENDPOINT,location.search])

    useEffect(() => {

        //message from server
        socket.on('message',(message) => {
            console.log(message)
            // outputMessage(message);
            // //Scroll Down
            // chatMessages.scrollTop = chatMessages.scrollHeight;
            setMessages([...messages,message]);

        })
    },[messages])

    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            socket.emit('chatMessage',message)
        }
        console.log(message);
    }

    console.log(message,messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                {/* <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                /> */}
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                

            </div>
        </div>
    )
}

export default Chat
