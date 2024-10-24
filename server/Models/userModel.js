import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    
    unique: true,
  },
  email: {    
    type: String,
    required: true,
    unique: true,
   
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  avatar:{
        public_id:{
            type:String
        },
        secure_url:{
            type:String
        }
    },
});

export default  mongoose.model("Users", userSchema);