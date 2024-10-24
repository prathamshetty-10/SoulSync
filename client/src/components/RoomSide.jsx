import React, { useEffect } from "react";
import { useState } from "react";

import { SiGoogleclassroom } from "react-icons/si";

function RoomSide({rooms,currentuser,changeRoom,socket}){
    const [currentUserName,setCurrentUser]=useState(currentuser.username);
    const [currentSelected,setCurrentSelected]=useState(undefined);


    const changeCurrentRoom=(index,room)=>{
        setCurrentSelected(index);
        changeRoom(room);
    }
    
    return <div className="text-white flex flex-col items-center text-2xl lg:text-3xl gap-[0.8rem]   ">
    
    
    <div className="lg:flex lg:gap-[40px]  p-[0.4rem]  items-center justify-center text-2xl lg:text-3xl bg-[#ffffff39] min-h-[5rem] w-[100%] transition ease-in-out duration-200 mb-[10px] ">
    <div className="flex gap-[20px] p-[0.2rem] items-center justify-center">
    
    <img src={currentuser.avatar.secure_url} className="h-[40px] w-[40px] rounded-full mt-[8px]" /></div>
        <div className="text-white flex justify-center items-center">{currentUserName}</div>
    </div>
    Rooms
    {
        rooms?.map((room,index)=>{
            return(
                currentSelected===index?(
                    <div className="flex gap-[8px] lg:gap-[40px] cursor-pointer rounded-[0.5rem] lg:p-[0.4rem]   items-center justify-center text-lg font-bold  lg:text-2xl bg-[#762b98] min-h-[5rem] w-[90%] transition ease-in-out duration-200 my-[10px] border-2 border-white" key={index} onClick={()=>changeCurrentRoom(index,room)}>
                    <SiGoogleclassroom  className="h-[0px] lg:h-[40px] w-[0px] lg:w-[40px] " />
                    <div className="text-white">{room.name}</div>
                    </div>
                ):(<div className="flex gap-[8px] lg:gap-[40px] cursor-pointer rounded-[0.5rem] lg:p-[0.4rem]   items-center justify-center text-lg font-bold lg:text-2xl bg-[#ffffff39] min-h-[5rem] w-[90%] transition ease-in-out duration-200 my-[10px]" key={index} onClick={()=>changeCurrentRoom(index,room)}>
                    <SiGoogleclassroom  className="h-[0px] lg:h-[40px] w-[0px] lg:w-[40px] " />
                    <div className="text-white">{room.name}</div>
                    </div>)
                
            )
        })
    }
    
    </div>

}
export default RoomSide;