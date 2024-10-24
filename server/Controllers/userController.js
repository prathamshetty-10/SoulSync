import User from "../Models/userModel.js";
import Contacts from "../Models/contactModel.js";
import fs from "fs/promises"
import cloudinary from 'cloudinary'


export const login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      const isPasswordValid = (password==user.password)?true:false;
      if (!isPasswordValid)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      delete user.password;
      return res.json({ status: true, user });
    } catch (ex) {
        console.log(ex);
      next(ex);
    }
  };
export const register = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const usernameCheck = await User.findOne({ username });
        if (usernameCheck)
            return res.json({ msg: "Username already used", status: false });
        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.json({ msg: "Email already used", status: false });
        let publicId='';
        let secure_url='';
        if(req.file){
            
            const options = {
                folder:`${email}`,
                use_filename: true,
                unique_filename: false,
                overwrite: false,
              };
            const result=await cloudinary.v2.uploader.upload(req.file.path,options);
            if(result){
                publicId=result.public_id;
                secure_url=result.secure_url;
                
                fs.rm(`uploads/${req.file.filename}`);
                
            }
            else{
                return res.status(500).json({
                    success:false,
                    message:"No cloudinary result"
                })
            }

        }
    else{
        return res.status(500).json({
            success:false,
            message:"no file uploaded"
        })


    }
      const user = await User.create({
        email,
        username,
        password: password,
        avatar:{
            public_id:publicId,
            secure_url:secure_url,
        }
      });
      delete user.password;
      return res.json({ status: true, user });
    } catch (ex) {
        console.log(ex);
      next(ex);
    }
  };
  
export const getContacts = async (req, res, next) => {
  try {
    const { username } = req.body;
    
    const contacts = await Contacts.find({
      username1:username
    })
    if (!contacts)
      return res.json({ msg: "No Contacts available", status: false });
    return res.json({ status: true, contacts });
  } catch (ex) {
      console.log(ex);
    next(ex);
  }
};
export const addContacts = async (req, res, next) => {
  try {
    const { username1, secure_url1,username2,secure_url2 } = req.body;
    const usernameCheck1 = await User.findOne({ username1 });
      if (usernameCheck1)
          return res.json({ msg: "Username 1 doesnt exist", status: false });
      const usernameCheck2 = await User.findOne({ username2 });
      if (usernameCheck2)
          return res.json({ msg: "Username 2 doesnt exist", status: false });
      
      
    const contact = await Contacts.create({
      username1:username1,
      secure_url1:secure_url1,
      username2:username2,
      secure_url2:secure_url2
    });
    const contact2 = await Contacts.create({
      username1:username2,
      secure_url1:secure_url2,
      username2:username1,
      secure_url2:secure_url1
      
    });
    return res.json({ status: true,msg:'added contact'});
  } catch (ex) {
      console.log(ex);
    next(ex);
  }
};
export const searchContacts = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.find({username:`${username}`});
    if (!user)
      return res.json({ msg: "No user available", status: false });
    
    
    return res.json({ status: true, user });
  } catch (ex) {
      console.log(ex);
    next(ex);
  }
};
export const deleteContact = async (req, res, next) => {
  try {
    const { username1,username2 } = req.body;
    const usernameCheck = await User.findOne({ username1 });
      if (usernameCheck)
          return res.json({ msg: "Username 1 doesnt exist", status: false });
      const usernameCheck2 = await User.findOne({ username2 });
      if (usernameCheck2)
          return res.json({ msg: "Username 2 doesnt exist", status: false });
      
      
      
    const contact = await Contacts.findOneAndDelete({
      username1:username1,
      username2:username2,
    });
    const contact2 = await Contacts.findOneAndDelete({
      username1:username2,
      username2:username1,
      
    });
    return res.json({ status: true,msg:'deleted contact'});
  } catch (ex) {
      console.log(ex);
    next(ex);
  }
};
