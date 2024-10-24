import React from "react";

import ChatInput from "./ChatInput";
import {botRoute} from "../utils/APIRoutes";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { sendMessageRoute } from "../utils/APIRoutes";
export default function BotContainer({currentuser,handleNewMsg}){
    const [gotresp,setGotresp]=useState(0);
    const [messages,setMessages]=useState([]);
    const handleSendMessage=async(msg)=>{
        setGotresp(1);
        const userMessage = { fromSelf: true, message: msg };

        // Update state to add the user's message
        setMessages((prevMessages) => [...prevMessages, userMessage]);
    
        try {
            // Send the message to the bot
            const response = await axios.post(botRoute, {
                message: msg,
            });
    
            // Check if the response is valid and contains a response message
            if (response && response.data.resp) {
                // Create a new message object for the bot's response
                const botMessage = { fromSelf: false, message: response.data.resp };
    
                // Update state to add the bot's response
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            // Optionally handle error state
        } finally {
            setGotresp(0); // Reset the response flag if needed
        }
        
        
    }
   
    
    
    return(
        <div className="max-h-[100%] overflow-hidden ">
        
        
        <div className="flex flex-col">
            <div className="flex text-white justify-between items-center py-[1rem] px-[3rem] bg-[#ffffff39] rounded-3xl">
                <div className="flex gap-[3rem]">
                    
                    <div className="text-white text-4xl">BOT 
                    </div>
                </div>
            </div>

            <div className="h-[62vh] py-[0.5rem] px-[2rem] flex flex-col gap-[1rem] ">
            <ScrollToBottom className="h-[62vh] ">
            {
            messages.map((message)=>{
                return(
                <div key={message}>
                    {message.fromSelf?(<div className="text-white flex justify-end items-center w-[50%] my-[15px] ml-[200px] lg:ml-[420px] "><div className=" max-w-[90%] py-[0.5rem] px-[2rem] break-words lg:text-xl rounded-3xl bg-purple-800">{message.message}</div></div>):(<div className="text-white flex  justify-start items-center w-[50%] my-[15px] "><div className=" max-w-[90%] py-[0.5rem] px-[2rem] break-words lg:text-xl rounded-3xl bg-blue-900">{message.message}</div></div>)
                }
                </div>


                )
                
                })
            
            }
            
            </ScrollToBottom>
            </div>
            <div>
            {gotresp==0?(<ChatInput handleSendMessage={handleSendMessage}/>):(<div className="flex items-center justify-center  py-[1rem] px-[2rem] h-[77px] relative text-white  ">Bot is Typing...</div>)}
            
            
            
            
            </div>




        </div>
        
        </div>)
}