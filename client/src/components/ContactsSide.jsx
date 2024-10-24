import React from "react";
import { useState } from "react";


function ContactsSide({contacts,currentuser,changeChat}){
    const [currentUserName,setCurrentUser]=useState(currentuser.username);
    const [currentSelected,setCurrentSelected]=useState(undefined);


    const changeCurrentChat=(index,contact)=>{
        setCurrentSelected(index);
        changeChat(contact);
    }
    return <div className="text-white flex flex-col items-center text-2xl lg:text-3xl gap-[0.8rem]   ">
    
    
    <div className="lg:flex lg:gap-[40px]  p-[0.4rem]  items-center justify-center text-2xl lg:text-3xl bg-[#ffffff39] min-h-[5rem] w-[100%] transition ease-in-out duration-200 mb-[10px] ">
    <div className="flex gap-[20px] p-[0.2rem] items-center justify-center">
    
    <img src={currentuser.avatar.secure_url} className="h-[40px] w-[40px] rounded-full mt-[8px]" /></div>
        <div className="text-white flex justify-center items-center">{currentUserName}</div>
    </div>
    Contacts
    {
        contacts?.map((contact,index)=>{
            return(
                currentSelected===index?(
                    <div className="flex gap-[8px] lg:gap-[40px] cursor-pointer rounded-[0.5rem] lg:p-[0.4rem]   items-center justify-center lg:text-3xl bg-[#762b98] min-h-[5rem] w-[90%] transition ease-in-out duration-200 my-[10px] border-2 border-white" key={index} onClick={()=>changeCurrentChat(index,contact)}>
                    <img src={contact.secure_url2} className="h-[30px] lg:h-[40px] w-[30px] lg:w-[40px] rounded-full" />
                    <div className="text-white">{contact.username2}</div>
                    </div>
                ):(<div className="flex gap-[8px] lg:gap-[40px] cursor-pointer rounded-[0.5rem] lg:p-[0.4rem]   items-center justify-center lg:text-3xl bg-[#ffffff39] min-h-[5rem] w-[90%] transition ease-in-out duration-200 my-[10px]" key={index} onClick={()=>changeCurrentChat(index,contact)}>
                    <img src={contact.secure_url2} className="h-[30px] lg:h-[40px] w-[30px] lg:w-[40px] rounded-full" />
                    <div className="text-white">{contact.username2}</div>
                    </div>)
                
            )
        })
    }
    
    </div>

}
export default ContactsSide;