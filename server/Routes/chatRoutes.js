import {sendMesg} from "../Controllers/chatController.js";
import express from "express"
const router=express.Router();
router.post("/sndmsg", sendMesg);

export default  router;