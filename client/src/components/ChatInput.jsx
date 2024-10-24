import React from "react";
import { useState } from "react";
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'
function ChatInput({handleSendMessage}){
    const [showEmoji,setShowEmoji]=useState(false);
    const [msg,setMsg]=useState("");
    const handleEmoji=()=>{
        setShowEmoji(!showEmoji);
    }
    const handleEmojiClick=(emojiobj)=>{

        let message=msg;
        let result=message + emojiobj.emoji
        setMsg(result);
    }
    function handleUserInput(e){
        
        const {value}=e.target;
        setMsg(value);
       
    }
    const sendChat=(event)=>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMessage(msg);
            setMsg("");
        }
    }
    return (
        <div className="flex items-center justify-center  py-[1rem] px-[2rem] h-[77px] relative  ">
            <div className="w-[8%] flex items-center gap-[1rem]">
                <div className="">
                    <BsEmojiSmileFill  className="text-yellow-400 text-4xl cursor-pointer absolute top-5 left-4 lg:top-5 lg:left-9 z-50" onClick={handleEmoji}/>
                    {showEmoji && <Picker onEmojiClick={handleEmojiClick}  className="absolute  top-[-280px] "/>}
                
                
                </div>
            </div>
            <form className="w-[90%] flex gap-[1rem] lg:gap-[2rem]" onSubmit={(e)=>sendChat(e)}>
                <input type="text" placeholder="Type Message Here" value={msg} onChange={handleUserInput} className="w-[85%] h-[3rem] rounded-[2rem] px-[2rem] bg-[#ffffff34] text-white"/>
                <button type="submit" className="w-[15%] bg-[#9a86f3] flex justify-center items-center rounded-[2rem] hover:bg-[#ebe7ff] hover:text-blue-700 transition-all duration-200"><IoMdSend size={25}/></button>
            
            
            </form>
        
        
        
        </div>
    )

}
export default ChatInput;