import React from "react";
import { useNavigate } from "react-router-dom";
import {BiPowerOff} from 'react-icons/bi'
import { FaRocketchat } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { MdPersonSearch } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import Robot from '../assets/robot.gif'
import { addRoomsRoute } from "../utils/APIRoutes";
import axios from "axios";
export  default  function AddRoom(){
    const navigate=useNavigate();
    const handleClick1=async()=>{
        localStorage.clear();
        navigate("/");
    }
    const [roomData,setRoomData]=useState({
        name:"",
        description:""
    });
    
    function handleUserInput(e){
        const {name,value}=e.target;
        setRoomData({
            ...roomData,
            [name]:value
        })
    }
    async function handleSubmit(event){
        event.preventDefault();
        if(!roomData.name || !roomData.description){
            toast.error("Please fill all details");
            return;

        }
        const { data } = await axios.post(addRoomsRoute,roomData);
    
          if (data.status === false) {
            toast.error(data.msg);
          }
          if (data.status === true) {
            toast.success('suggessfully added')
            
            setRoomData({
                name:"",
                description:"",
                
            });
            navigate("/room");
          }
        
            }
    return(
        <div className="h-[100vh] w-[100vw] bg-[#131324] flex items-center justify-center">
        
        <div className="h-[100vh] w-[85vw] bg-[#00000076] ">
        <div className=" h-[10%] pt-[3rem] flex justify-center items-center gap-[1.5rem] mb-[40px] relative">
       
        <button onClick={()=>navigate('/chats')} className="flex items-center justify-center p-[0.4rem] lg:p-[0.6rem] bg-[#9a86f3] rounded-2xl text-2xl cursor-pointer hover:bg-[#ebe7ff] hover:text-blue-700 font-bold w-[140px]"><FaRocketchat className="mr-[4px]"/>Chats</button>
        <button onClick={()=>navigate('/bot')} className="flex items-center justify-center p-[0.4rem] lg:p-[0.6rem] bg-[#9a86f3] rounded-2xl text-2xl cursor-pointer hover:bg-[#ebe7ff] hover:text-blue-700 font-bold w-[140px]"><FaRocketchat className="mr-[4px]"/>ChatBot</button>
        <button onClick={()=>navigate('/contacts')} className="flex items-center justify-center p-[0.4rem] lg:p-[0.6rem] bg-[#9a86f3] rounded-2xl text-2xl cursor-pointer hover:bg-[#ebe7ff] hover:text-blue-700 font-bold w-[140px]"><MdPersonSearch className="mr-[4px]"/>Contacts</button>
        <button onClick={()=>navigate('/room')} className="flex items-center justify-center p-[0.4rem] lg:p-[0.6rem] bg-[#9a86f3] rounded-2xl text-2xl cursor-pointer hover:bg-[#ebe7ff] hover:text-blue-700 font-bold w-[140px]"><SiGoogleclassroom className="mr-[4px]"/>Rooms</button>
        <button onClick={handleClick1} className="flex items-center justify-center p-[0.4rem] lg:p-[0.6rem] bg-[#9a86f3] rounded-2xl text-2xl cursor-pointer hover:bg-[#ebe7ff] hover:text-blue-700 font-bold w-[140px]"><BiPowerOff className="mr-[4px]"/>Logout</button>
        

        
        </div>
        <div className="h-[80%] flex items-center justify-center">
        <form onSubmit={(e)=>handleSubmit(e)} className="bg-[#00000076] flex flex-col rounded-3xl px-[4rem] pt-[2.5rem] pb-[2rem] shadow-[0_0_5px_gray] gap-2 w-[400px]">
        <div className="flex gap-[1.5rem]">
            <IoArrowBackSharp  className="h-[50px] w-[50px] mr-[1rem] text-white cursor-pointer" onClick={()=>navigate('/room')}/>
            <h1 className="font-bold text-white text-3xl">Add Room</h1>
        </div>
        <input type="text" placeholder="Enter Room Name" name="name" value={roomData.name} onChange={handleUserInput} className="bg-transparent p-[1rem] border-[0.1rem] border-[#4e0eff] rounded-2xl font-[1rem] text-white w-[100%] my-[1rem]"/>
        
        <textarea type="text" placeholder="Enter description of the room" name="description" value={roomData.description} onChange={handleUserInput} className="bg-transparent p-[1rem] border-[0.1rem] border-[#4e0eff] rounded-2xl font-[1rem] text-white w-[100%] mb-[1rem]   resize-none h-[130px]"/>
        
        <button type="submit" className="bg-[#997af0] hover:bg-[#4e0eff] p-[1rem] border-[0.1rem]  rounded-2xl font-[1rem] text-white w-[100%] mb-[0.5rem] ">Add</button>
        
    
    
    </form>
        
        
        </div>
        
        
        </div>
        
        
        </div>

    )
}