import { loginRoute } from "../utils/APIRoutes";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {toast} from "react-hot-toast";
import logo from '../assets/logo.png'
import { useEffect } from "react";
import axios from "axios";

export default function Login(){
    const navigate=useNavigate();
    
    
    const [loginData,setLoginData]=useState({
        username:"",
        password:""
    });
    
    function handleUserInput(e){
        const {name,value}=e.target;
        setLoginData({
            ...loginData,
            [name]:value
        })
    }
    async function handleSubmit(event){
        event.preventDefault();
        if(!loginData.password || !loginData.username){
            toast.error("Please fill all details");
            return;

        }
        const { data } = await axios.post(loginRoute,loginData);
    
          if (data.status === false) {
            toast.error(data.msg);
          }
          if (data.status === true) {
            localStorage.setItem('login-user',JSON.stringify(data.user));
            toast.success('suggessfull login')
            navigate("/home");
            setLoginData({
                username:"",
                password:"",
                
            });
          }
        
            }
            useEffect(() => {
              //localStorage.clear();
                if (localStorage.getItem('login-user')) {
                  navigate("/home");
                }
              }, []); 
    return ( <div className="h-[100vh] w-[100vw] bg-[#131324] flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-[#00000076] flex flex-col rounded-3xl px-[4rem] pt-[2.5rem] pb-[2rem] shadow-[0_0_5px_gray] gap-2">
            <div className="flex">
                <img src={logo} alt="hi" className="h-[50px] w-[50px] mr-[1rem]"></img>
                <h1 className="font-bold text-white text-3xl">HealthHuddle</h1>
            </div>
            <input type="text" placeholder="Enter UserName" name="username" value={loginData.username} onChange={handleUserInput} className="bg-transparent p-[1rem] border-[0.1rem] border-[#4e0eff] rounded-2xl font-[1rem] text-white w-[100%] my-[1rem]"/>
            
            <input type="password" placeholder="Enter password" name="password" value={loginData.password} onChange={handleUserInput} className="bg-transparent p-[1rem] border-[0.1rem] border-[#4e0eff] rounded-2xl font-[1rem] text-white w-[100%] mb-[1rem]"/>
            
            <button type="submit" className="bg-[#997af0] hover:bg-[#4e0eff] p-[1rem] border-[0.1rem]  rounded-2xl font-[1rem] text-white w-[100%] mb-[0.5rem] ">Click</button>
            <span className="text-white mx-[1rem]">Dont have an account??   <Link to="/register" className="text-blue-500">Register</Link></span>
        
        
        </form>
    
        
        
        
        
        
        
        
        </div>)

}