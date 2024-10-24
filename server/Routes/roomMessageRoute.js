import { getAllRoomMessage,addRoomMessage } from "../Controllers/RoomMessageController.js";
import express from "express"
const router=express.Router();
router.post("/addmsg", addRoomMessage);
router.post("/getmsg", getAllRoomMessage);

export default  router;