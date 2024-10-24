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
import { getContactsRoute,searchUserRoute,addContactRoute ,deleteContactRoute} from "../utils/APIRoutes";
function Contact(){
    const [contacts,setContacts]=useState([]);
    const [search,setSearch]=useState("");
    const [searchedUser,setSearchedUser]=useState(undefined);
    const [currentuser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("login-user")));
    const navigate=useNavigate();
    const handleClick1=async()=>{
        localStorage.clear();
        navigate("/");
    }
    const func=async()=>{
        if(currentuser){
            const data=await axios.post(`${getContactsRoute}`,{
                username:currentuser.username
            });
            setContacts(data.data.contacts);
            
            
        }
        else{
            navigate("/");
        }
    }
    function findIf(name){
        let val=false;
        contacts.map((contac)=>{

            if(contac.username2==`${name}`){val=true}
        })
        return val;
    }
    function handleUserInput(e){
        
        const {value}=e.target;
        setSearch(value);
       
    }
    const handleSearch=async(search1)=>{
        const data=await axios.post(searchUserRoute,{
            username:search1
        })
        if(data.data.status==true){
            setSearchedUser(data.data.user[0]);
        }
        else{
            setSearchedUser(undefined)
            return;
        }
    }
    const handleAddContact=async(e)=>{
        e.preventDefault();
        if(searchedUser){
        const data=await axios.post(addContactRoute,{
            username1:currentuser?.username,
            secure_url1:currentuser?.avatar?.secure_url,
            username2:searchedUser.username,
            secure_url2:searchedUser.avatar?.secure_url
        })
        if(data.data.status==true){
            toast.success(data.data.msg);
            func();

        }
        else{
            toast.error(data.data.msg)
            
        }}
    }
    const handleDelete=async(e,contact)=>{
        e.preventDefault();
        if(contact){
        const data=await axios.post(deleteContactRoute,{
            username1:currentuser?.username,
            username2:contact.username2,
        })
        if(data.data.status==true){
            toast.success(data.data.msg);
            func();

        }
        else{
            toast.error(data.data.msg)
            
        }}
    }
    const searchContact=(event)=>{
        event.preventDefault();
        if(search.length>0){
            handleSearch(search);
            setSearch("");
        }
    }
  
    
    useEffect(()=>{
        func();
    },[])
    
    return(
        <div className="h-[100vh] w-[100vw] bg-[#131324] flex items-center justify-center">
        
        <div className="h-[100vh] w-[85vw] bg-[#00000076] ">
        <div className=" h-[10%] pt-[3rem] flex justify-center items-center gap-[1.5rem]">
        
        <button onClick={()=>navigate('/chats')} className="flex items-center justify-center p-[0.4rem] lg:p-[0.6rem] bg-[#9a86f3] rounded-2xl text-2xl cursor-pointer hover:bg-[#ebe7ff] hover:text-blue-700 font-bold w-[140px]"><FaRocketchat className="mr-[4px]"/>Chats</button>
        <button onClick={()=>navigate('/bot')} className="flex items-center justify-center p-[0.4rem] lg:p-[0.6rem] bg-[#9a86f3] rounded-2xl text-2xl cursor-pointer hover:bg-[#ebe7ff] hover:text-blue-700 font-bold w-[140px]"><FaRocketchat className="mr-[4px]"/>ChatBot</button>
        <button onClick={()=>navigate('/contacts')} className="flex items-center justify-center p-[0.4rem] lg:p-[0.6rem] bg-[#9a86f3] rounded-2xl text-2xl cursor-pointer hover:bg-[#ebe7ff] hover:text-blue-700 font-bold w-[140px]"><MdPersonSearch className="mr-[4px]"/>Contacts</button>
        <button onClick={()=>navigate('/room')} className="flex items-center justify-center p-[0.4rem] lg:p-[0.6rem] bg-[#9a86f3] rounded-2xl text-2xl cursor-pointer hover:bg-[#ebe7ff] hover:text-blue-700 font-bold w-[140px]"><SiGoogleclassroom className="mr-[4px]"/>Rooms</button>
        <button onClick={handleClick1} className="flex items-center justify-center p-[0.4rem] lg:p-[0.6rem] bg-[#9a86f3] rounded-2xl text-2xl cursor-pointer hover:bg-[#ebe7ff] hover:text-blue-700 font-bold w-[140px]"><BiPowerOff className="mr-[4px]"/>Logout</button>
        

        
        </div>
        <div className="h-[90%] overflow-auto">
            <div className="h-[300px] flex flex-col items-center justify-top mt-[50px] gap-[2rem]">
                <h1 className="text-white text-2xl">Search users To Connect With !!</h1>
                <form className="w-[60%] flex gap-[1rem] lg:gap-[2rem]" onSubmit={(e)=>{searchContact(e)}}>
                <input type="text" placeholder="Search username here" value={search} onChange={handleUserInput} className="w-[85%] h-[3rem] rounded-[2rem] px-[2rem] bg-[#ffffff34] text-white"/>
                <button type="submit" className="w-[15%] bg-[#9a86f3] flex justify-center items-center rounded-[2rem] hover:bg-[#ebe7ff] hover:text-blue-700 transition-all duration-200"><IoMdSend size={25}/></button>
            
            
            </form>
            {searchedUser?(<div className="text-white">
                <div className="flex gap-[8px] sm:gap-[40px] cursor-pointer rounded-[0.5rem] sm:p-[0.4rem]   items-center justify-center sm:text-3xl bg-[#ffffff39] min-h-[5rem] w-[350px] transition ease-in-out duration-200 my-[10px]" >
                    <img src={searchedUser.avatar.secure_url} className="h-[30px] sm:h-[40px] w-[30px] sm:w-[40px] rounded-full" />
                    <div className="text-white">{searchedUser.username}</div>
                    <div className="text-white text-xl">{(findIf(searchedUser.username)==1 || searchedUser.username==currentuser.username)?(<div className="bg-green-500 text-black font-bold mt-[8px] px-[0.6rem] py-[0.4rem] rounded-3xl">Added</div>):(<div className="bg-green-500 text-black font-bold mt-[8px] px-[0.6rem] py-[0.4rem] rounded-3xl hover:bg-green-300" onClick={(e)=>handleAddContact(e)}>Add</div>)}</div>
                    </div></div>):(<div className="text-white">
                no such user
                </div>)}
            </div>
            <div>
            <div className="flex justify-center items-center text-2xl mb-[20px] font-bold "><p className="text-white">Contacts</p></div>
            <div className="flex flex-col justify-center items-center">
            {
                contacts.length==0?(<div className="text-white flex items-center justify-center text-2xl"><p>No Contacts yet add contacts</p> </div>):(contacts?.map((contact,index)=>{
                    return(
                        <div className="flex gap-[8px] sm:gap-[40px] cursor-pointer rounded-[0.5rem] sm:p-[0.4rem]   items-center justify-center sm:text-3xl bg-[#ffffff39] min-h-[5rem] w-[550px] transition ease-in-out duration-200 my-[10px]" key={index}>
                    <img src={contact.secure_url2} className="h-[30px] sm:h-[40px] w-[30px] sm:w-[40px] rounded-full" />
                    <div className="text-white w-[200px]">{contact.username2}</div>
                    <div className="text-white text-xl flex items-center justify-center gap-[2rem]"><div className="bg-green-500 text-black font-bold mt-[8px] px-[0.6rem] py-[0.4rem] rounded-3xl">Added</div><div className="bg-red-500 text-black font-bold mt-[8px] px-[0.6rem] py-[0.4rem] rounded-3xl hover:bg-red-300" onClick={(e)=>handleDelete(e,contact)}>Delete</div>
                    </div>
                    </div>
                )
                }))
            }
            </div>
            
            
            </div>
        
        
        </div>
        
        </div></div>
    )

}
export default Contact;