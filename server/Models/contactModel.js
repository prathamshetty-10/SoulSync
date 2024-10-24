import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  username1:{type:String},
  secure_url1:{type:String},
  username2:{type:String},
  secure_url2:{type:String},
  
  
});

export default  mongoose.model("Contacts", contactSchema);