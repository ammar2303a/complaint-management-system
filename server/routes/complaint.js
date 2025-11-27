import Complaint from "../models/Complaint.js";
import mongoose from "mongoose";
import express from "express"

const router = express.Router()

router.post("/create", async (req,res)=>{
    const {userId, name , complaintphone, address, complaintText, model, workerId} = req.body;
    const postComplaint = new Complaint({userId,name,complaintphone,address,complaintText,model, workerId})
    await postComplaint.save();
    res.status(201).send("Complaint Send Successfully") 
})

router.get("/", async(req, res)=>{
    const getComp = await Complaint.find().populate("model", "name model").populate("workerId", "name");
    res.json(getComp)
})

router.get("/worker/:workerId", async(req,res)=>{
    const {workerId} = req.params;
    const getonlyworker = await Complaint.find({workerId}).populate("model", "name")
    .populate("workerId", "name")
    res.json(getonlyworker)
})

router.put("/status/:id", async (req,res)=>{
    const {id} = req.params;
    const updCompt = await Complaint.findByIdAndUpdate(id, req.body, {new:true})
    res.json(updCompt)
})

router.put("/:id", async(req, res)=>{
    const {id} = req.params;
    const updComplaint = await Complaint.findByIdAndUpdate(id, req.body, {new:true})
    res.json(updComplaint)
})

router.get("/mycomplaint/:userId", async (req,res)=>{
    const {userId} = req.params;
    const getonlyUserComp = await Complaint.find({userId}).populate("workerId", "name phone")
    .populate("model", "name");
    res.json(getonlyUserComp)
})


export default router