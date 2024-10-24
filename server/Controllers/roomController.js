import roomModel from "../Models/roomModel.js";

export const addRoom = async (req, res, next) => {
    try{
        const {name,description}=req.body;
        const nameCheck = await roomModel.findOne({ name });
        if (nameCheck)
            return res.json({ msg: "Room with this name already used", status: false });
        const data=await roomModel.create({
            name:name,
            description:description,
        });
        if(data)return res.json({msg:"room added",status:true})
            else{
        return res.json({msg:"room not added",status:false})}


    }
    catch(err){
        next(err);
    }
  };
export const getAllRooms = async (req, res, next) => {
    try{
        
        const rooms=await roomModel.find({})
        if(rooms)
            res.json({status:true,rooms,msg:'rooms returned'});
        else
            res.json({status:false,msg:'no rooms'})

    }
    catch(err){
        next(err);
    }
  };