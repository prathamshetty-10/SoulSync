import RoomMessageModel from "../Models/RoomMessageModel.js";

export const addRoomMessage = async (req, res, next) => {
    try{
        const {from,name,message}=req.body;
        const data=await RoomMessageModel.create({
            message:{text:message},
            name:name,
            sender:from,
        });
        if(data)return res.json({msg:"message added"})
            else{
        return res.json({msg:"message not added"})}


    }
    catch(err){
        next(err);
    }
  };
export const getAllRoomMessage = async (req, res, next) => {
    try{
        const {name,user}=req.body;
        const messages=await RoomMessageModel.find({ 
            name:name,
        }).sort({updatedAt:1});
        const projectedMessages=messages.map((msg)=>{ 
            return{
                fromSelf:msg.sender===user,
                message:msg.message.text,
                from:msg.sender,
            };
        });
        res.json(projectedMessages);


    }
    catch(err){
        next(err);
    }
  };