// const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages')
const { userJoin,getCurrentUser,userLeave,getRoomUsers} = require('./utils/users')

const app = express();
const server = http.createServer(app);
const io = socketio(server);


//Set static folder
// app.use(express.static(path.join(__dirname,'public')));

const botName = "ChatCord bot";

//Run When Client Connects
    io.on('connection',socket => {
    
    //Join Room
    socket.on('joinRoom',({ name,room })=>{

        const user = userJoin(socket.id,name,room);

        socket.join(user.room)


        //Welcome current user
        socket.emit('message',formatMessage(botName,'Welcome to chatcord'));

        //Broadcast when a user connects
        socket.broadcast.to(user.room).emit('message',formatMessage(botName,`${user.name} has joined the chat`));
        //Send users and room info
        io.to(user.room).emit('roomUsers',{
            room: user.room,
            users:getRoomUsers(user.room)
        })
    })

   

    
    //Listen for chat message
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message',formatMessage(user.name,msg));
    })

    //Runs when the client disconnects
    socket.on('disconnect',() => {

        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit('message',formatMessage(botName,`${user.name} has left the chat`));
        }

        io.to(user.room).emit('roomUsers',{
            room: user.room,
            users:getRoomUsers(user.room)
        })

       
    })

})

const PORT = 3001 || process.env.PORT;

server.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));