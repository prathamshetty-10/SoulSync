import { addRoom,getAllRooms } from "../Controllers/roomController.js";
import express from "express"
const router=express.Router();
router.post("/addroom", addRoom);
router.get("/getroom", getAllRooms);

export default  router;