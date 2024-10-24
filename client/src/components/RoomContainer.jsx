import React from "react";

import ChatInput from "./ChatInput";
import { getRoomMessageRoute,sendRoomMessageRoute } from "../utils/APIRoutes.js";

import { SiGoogleclassroom } from "react-icons/si";
import { BsInfoSquare } from "react-icons/bs";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
export default function RoomContainer({currentuser,currentRoom,socket}){
    const [arrivalMessage,setArrivalmessage]=useState(null);
    const [messages,setMessages]=useState([]);
    const [visible,SetVisible]=useState(false);
    const handleSendMessage=async(msg)=>{
        await axios.post(sendRoomMessageRoute,{
            from:currentuser.username,
            name:currentRoom.name,
            message:msg,
        })
        socket.emit("send_mesg-room",{
           
            from:currentuser.username,
            message:msg,
            room:currentRoom.name
        })
        const msgs=[...messages];
        msgs.push({fromSelf:true,message:msg,from:currentuser.username});
        setMessages(msgs);
    }
    const handleVisible=()=>{
        SetVisible(!visible);
    }
    const func=async()=>{
        if(currentRoom){
        const response=await axios.post(getRoomMessageRoute,{
            user:currentuser.username,
            name:currentRoom.name
        })
        setMessages(response.data);}
    }
    useEffect(()=>{
        func();
    },[currentRoom])
    useEffect(()=>{
        if(socket){
            socket.on("receive_message",(data)=>{
                setArrivalmessage({fromSelf:false,message:data.message,from:data.from,room:data.room});
            })
        }
    },[])
    useEffect(()=>{
        if(arrivalMessage){ 
            if(arrivalMessage.room==currentRoom.name){
             const newmsg={
                fromSelf:false,
                message:arrivalMessage.message,
                from:arrivalMessage.from
             }
             setMessages((prev)=>[...prev,newmsg])}}
            
    },[arrivalMessage])
    return(
        <div className="max-h-[100%] overflow-hidden ">
        
        {currentRoom && (
        <div className="flex flex-col">
            <div className="flex text-white justify-between items-center py-[1rem] px-[3rem] bg-[#ffffff39] rounded-3xl relative">
                <div className="flex gap-[3rem] justify-center items-center">
                    <SiGoogleclassroom  className="h-[50px] w-[50px]" />
                    <div className="text-white text-2xl text-center lg:text-4xl w-[220px] lg:w-[700px]">{currentRoom?.name} 
                    </div>
                    <BsInfoSquare className="h-[45px] w-[40px]  cursor-pointer hover:text-green-500 hover:scale-105" onClick={handleVisible}/>
                    {visible && <div className=" absolute bottom-[-300px] z-50 w-[300px] lg:w-[550px] text-xl left-[90px] lg:left-[200px] bg-[#ffffff39] rounded-3xl p-[2rem] break-words">{currentRoom.description}</div>}
                </div>
            </div>

            {visible==false?(<div className="h-[62vh] py-[0.5rem] px-[2rem] flex flex-col gap-[1rem]  ">
            <ScrollToBottom className=" h-[62vh]  ">
            {
            messages.map((message)=>{
                return(
                <div key={message}>
                    {message.fromSelf?(<div className="text-white flex justify-end items-center w-[50%] my-[15px] ml-[200px] lg:ml-[420px] "><div className=" max-w-[90%] py-[0.5rem] px-[2rem] break-words lg:text-xl rounded-3xl bg-purple-800"><span className="bg-green-500 text-black px-[0.4rem] rounded-3xl mr-[1rem]">You:</span>{message.message}</div></div>):(<div className="text-white flex  justify-start items-center w-[50%] my-[15px]"><div className=" max-w-[90%] py-[0.5rem] px-[2rem] break-words lg:text-xl rounded-3xl bg-blue-900"><span className="bg-green-500 text-black px-[0.4rem] rounded-3xl mr-[1rem]">{message.from}:</span>{message.message}</div></div>)
                }
                </div>


                )
                
                })
            
            }
            
            </ScrollToBottom>
            </div>):(
                <div className="h-[62vh] py-[0.5rem] px-[2rem] flex flex-col gap-[1rem]  ">
                </div>
        )}
            <div>
            <ChatInput handleSendMessage={handleSendMessage} />
            
            
            
            
            </div>




        </div>)
        }
        </div>)
}