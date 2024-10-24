import mongoose from 'mongoose'

const RoomMessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    sender: { 
      type: String
    },
    name:{
        type:String,
    }
  },
  {
    timestamps: true,
  }
);

export default  mongoose.model("RoomMessages", RoomMessageSchema);