import express from "express";
import { v4 as uuid } from "uuid";
import meeting from "../model/meeting.js";
const router = express.Router();

router.get("/",(req,res)=>{
    const meetId = uuid();
    res.status(200).send(meetId);
})
router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const meeting = meeting.findOne({id});
    if(meeting){
        res.status(200).send("Meeting is available");
    }
    else{
        res.status(404).send("Meeting not found");
    }
})
router.get("/create",(req,res)=>{
    
})
export default router;