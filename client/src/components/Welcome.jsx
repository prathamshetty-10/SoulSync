import React from "react";
import robot from '../assets/robot.gif'
function Welcome({currentuser}){
    return(
        <div className="flex flex-col items-center justify-center text-white text-3xl font-extrabold ">
        
        <div className="flex items-center justify-center">
        <img src={robot} className="mb-0 h-[350px] w-[350px] lg:h-[450px] lg:w-[450px]" />
        <img src={currentuser?.avatar?.secure_url} alt="hi" className="rounded-full h-[200px] w-[200px] lg:h-[300px] lg:w-[300px] "/>
        </div>
        <h1 className="mb-[40px]">Welcome, {currentuser.username}!!</h1>
        <div className="flex justify-center items-center text-xl lg:text-2xl"><p>Please Select What You Would Like to do Today.</p></div>
        
        
        </div>
    )
}
export default Welcome;