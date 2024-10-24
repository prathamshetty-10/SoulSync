import {
    login,
    register,
    getContacts,
    addContacts,
    searchContacts,
    deleteContact
  } from "../Controllers/userController.js";
  import express from 'express'
  import { upload } from "../middleware/multer.middleware.js";

  const router = express.Router();
  
  router.post("/login", login);
  router.post("/register",upload.single("avatar"), register);
  router.post("/getcontacts",getContacts);
  router.post("/addContact",addContacts);
  router.post("/searchContact",searchContacts);
  router.post("/deleteContact",deleteContact);
 
  //router.post("/allusers/:id",allusers)//all users excluding ourself
  

  export default router;