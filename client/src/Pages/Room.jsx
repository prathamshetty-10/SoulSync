import React from "react";
import { useNavigate } from "react-router-dom";
import {BiPowerOff} from 'react-icons/bi'
import { FaRocketchat } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { MdPersonSearch } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import { getRoomsRoute } from "../utils/APIRoutes";
import RoomSide from '../components/RoomSide.jsx'
import Robot from '../assets/robot.gif'
import axios from "axios";
import RoomContainer from "../components/RoomContainer.jsx";
import io from 'socket.io-client'
const socket=io.connect("http://localhost:5000");
export default function Room(){
    const navigate=useNavigate();
    const [currentRoom,setCurrentRoom]=useState(undefined);
    const [rooms,setRooms]=useState([]);
    const [currentuser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("login-user")));
    const handleClick1=async()=>{
        localStorage.clear();
        navigate("/");
    }
    const handleRoomChange=(room)=>{
        setCurrentRoom(room);
    }
    const func=async()=>{
        if(currentuser){
            const data=await axios.get(`${getRoomsRoute}`);
            setRooms(data.data.rooms);  
        }
        else{
            navigate("/");
        }
    }
    
    useEffect(()=>{
        func();
    },[])
    useEffect(()=>{
        if(currentRoom)socket.emit("join_room", currentRoom.name);
    },[currentRoom])
    return(
        <div className="h-[100vh] w-[100vw] bg-[#131324] flex items-center justify-center">
        
        <div className="h-[100vh] w-[85vw] bg-[#00000076] ">
        <div className=" h-[10%] pt-[3rem] flex justify-center items-center gap-[1.5rem] mb-[40px] relative">
        <div className="absolute top-[650px] left-0 lg:top-[40px] lg:left-[50px] w-[130px] lg:w-[200px]  rounded-3xl p-[0.2rem] text-center h-[40px] font-bold bg-green-600 text-black text-xl hover:bg-green-400 cursor-pointer " onClick={()=>navigate('/addroom')}>Add Room</div>
        <button onClick={()=>navigate('/chats')} className="flex items-center justify-center p-[0.4rem] lg:p-[0.6rem] bg-[#9a86f3] rounded-2xl text-2xl cursor-pointer hover:bg-[#ebe7ff] hover:text-blue-700 font-bold w-[140px]"><FaRocketchat className="mr-[4px]"/>Chats</button>
        <button onClick={()=>navigate('/bot')} className="flex items-center justify-center p-[0.4rem] lg:p-[0.6rem] bg-[#9a86f3] rounded-2xl text-2xl cursor-pointer hover:bg-[#ebe7ff] hover:text-blue-700 font-bold w-[140px]"><FaRocketchat className="mr-[4px]"/>ChatBot</button>
        <button onClick={()=>navigate('/contacts')} className="flex items-center justify-center p-[0.4rem] lg:p-[0.6rem] bg-[#9a86f3] rounded-2xl text-2xl cursor-pointer hover:bg-[#ebe7ff] hover:text-blue-700 font-bold w-[140px]"><MdPersonSearch className="mr-[4px]"/>Contacts</button>
        <button onClick={()=>navigate('/room')} className="flex items-center justify-center p-[0.4rem] lg:p-[0.6rem] bg-[#9a86f3] rounded-2xl text-2xl cursor-pointer hover:bg-[#ebe7ff] hover:text-blue-700 font-bold w-[140px]"><SiGoogleclassroom className="mr-[4px]"/>Rooms</button>
        <button onClick={handleClick1} className="flex items-center justify-center p-[0.4rem] lg:p-[0.6rem] bg-[#9a86f3] rounded-2xl text-2xl cursor-pointer hover:bg-[#ebe7ff] hover:text-blue-700 font-bold w-[140px]"><BiPowerOff className="mr-[4px]"/>Logout</button>
        

        
        </div>
        <div className="h-[83%] flex">
        <div className="w-[25%] bg-[#080420] overflow-auto scrollbar-thumb-slate-700 h-[100%] border-r-[0.1rem] border-white">
            <RoomSide rooms={rooms} currentuser={currentuser} changeRoom={handleRoomChange}/>
        </div>
        <div className="w-[75%]">
            {currentRoom===undefined?(
            <div className="flex flex-col items-center justify-center gap-[2rem]"><img src={Robot} alt="hi" className="h-[400px] w-[400px]"></img><p className="text-3xl text-white font-bold text-center"> Choose a Room to begin your conversation</p></div>):(<RoomContainer currentuser={currentuser} currentRoom={currentRoom} socket={socket}/>)}
            
            </div>
    
    </div></div></div>
    )
}