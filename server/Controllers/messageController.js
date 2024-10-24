import messageModel from '../Models/messageModel.js'

export const addMessage = async (req, res, next) => {
    try{
        const {from,to,message}=req.body;
        const data=await messageModel.create({
            message:{text:message},
            users:[from,to],
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
export const getAllMessage = async (req, res, next) => {
    try{
        const {from,to}=req.body;
        const messages=await messageModel.find({//get all messages with those from to and to from 
            users:{
                $all:[from,to],
            }
        }).sort({updatedAt:1});
        const projectedMessages=messages.map((msg)=>{ //new array made from messages
            return{
                fromSelf:msg.sender===from,
                message:msg.message.text
            };
        });
        res.json(projectedMessages);


    }
    catch(err){
        next(err);
    }
  };