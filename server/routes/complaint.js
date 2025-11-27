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

// const test = async () => {
//   try {
//     const complaint = new Complaint({
//       userId: new mongoose.Types.ObjectId("6926217efefa5d63ae88b667"),
//       name: "Habib Khan",
//       complaintphone: "99990004",
//       complaintText: "i have Some issues my fridge",
//       model: new mongoose.Types.ObjectId("692072f31213d12cff2a2073") // ObjectId
//     });
//     await complaint.save();
//     console.log("Complaint saved!");
//   } catch (error) {
//     console.log(error);
//   }
// }

// test();

export default router