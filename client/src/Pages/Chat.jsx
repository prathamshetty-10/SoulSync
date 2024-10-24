import React from "react";
import { useNavigate } from "react-router-dom";
import {BiPowerOff} from 'react-icons/bi'
import { FaRocketchat } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { MdPersonSearch } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {IoMdSend} from 'react-icons/io'
import toast from "react-hot-toast";
import { getContactsRoute } from "../utils/APIRoutes";
import ContactsSide from "../components/ContactsSide.jsx";
import Robot from '../assets/robot.gif'
import ChatContainer from "../components/ChatContainer.jsx";
import io from 'socket.io-client'
const socket=io.connect("http://localhost:5000");//http://localhost:5000
function Chat(){
    const navigate=useNavigate();
    
    const [currentuser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("login-user")));
    const [newmsg,setNewmsg]=useState("");
    const handleNewMsg=(from)=>{
        setNewmsg(from);
    }
    const [currentChat,setCurrentChat]=useState(undefined);
    const [contacts,setContacts]=useState([]);
    const handleClick1=async()=>{
        localStorage.clear();
        navigate("/");
    }
    const handleChatChange=(chat)=>{
        setCurrentChat(chat);
    }
    const func=async()=>{
        if(currentuser){
            const data=await axios.post(`${getContactsRoute}`,{
                username:currentuser.username
            });
            setContacts(data.data.contacts);
            socket.emit('add-user',currentuser.username);
            
            
        }
        else{
            navigate("/");
        }
    }
    
    useEffect(()=>{
        func();
    },[])
    useEffect(()=>{
        newmsg != "" && toast.success(`New Message from ${newmsg}`)
    },[newmsg])
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
    <div className="h-[83%] flex">
        <div className="w-[25%] bg-[#080420] overflow-auto scrollbar-thumb-slate-700 h-[100%] border-r-[0.1rem] border-white">
            <ContactsSide contacts={contacts} currentuser={currentuser} changeChat={handleChatChange}/>
        </div>
        <div className="w-[75%]">
            {currentChat===undefined?(
            <div className="flex flex-col items-center justify-center gap-[2rem]"><img src={Robot} alt="hi" className="h-[400px] w-[400px]"></img><p className="text-3xl text-white font-bold text-center"> Choose a Chat to begin your conversation</p></div>):(<ChatContainer currentuser={currentuser} currentChat={currentChat} socket={socket} handleNewMsg={handleNewMsg}/>)}
            
            </div>
    
    </div>
    </div></div>)
}
export default Chat;