import mongoose from 'mongoose'

const RoomSchema = mongoose.Schema(
  {
    name:{type:String},
    description:{type:String}
  }
);

export default  mongoose.model("Rooms", RoomSchema);