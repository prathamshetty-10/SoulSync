import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoutes from './Routes/userRoutes.js'
import messageRoute from './Routes/messageRoute.js'
import roomRoute from './Routes/roomRoute.js'
import roomMessageRoute from './Routes/roomMessageRoute.js'
import morgan from 'morgan'
import cloudinary from 'cloudinary'
import chatRoutes from './Routes/chatRoutes.js'

import {Server}  from 'socket.io'

mongoose.set('strictQuery',false)
const app=express();
import config from 'dotenv'
config.config();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/api/auth',userRoutes);
app.use('/api/messages',messageRoute);
app.use('/api/room',roomRoute);
app.use('/api/roomMessages',roomMessageRoute)
app.use('/api/chat',chatRoutes)


cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});
mongoose.connect(process.env.MONGO_URL)
    .then((conn)=>{
        console.log("connected to db:",conn.connection.host);
    })
    .catch((err)=>{
        console.log(err.message);
        process.exit();

    })
const server=app.listen(process.env.PORT,()=>{
    console.log(`connected to server port ${process.env.PORT}`);
})

const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        
        methods: ["GET", "POST"],

    },
})
global.onlineUsers=new Map();
io.on("connection",(socket)=>{
    console.log(`user connected ${socket.id}`)
    global.chatSocket=socket; 
    socket.on("add-user",(userId)=>{
        console.log(`adding user ${userId} ${socket.id}`)
        onlineUsers.set(userId,socket.id);
    });
    socket.on("send-msg",(data)=>{
        //checking if the to person is online
        const sendUserSocket=onlineUsers.get(data.to);
        if(sendUserSocket){
            console.log(`emmiting received data ${data.message} to ${sendUserSocket}`)
            socket.to(sendUserSocket).emit("msg-receive",data);
        }
    });
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
      });
    socket.on("send_mesg-room", (data) => {
    
        socket.to(data.room).emit("receive_message", data);
      });
    
})