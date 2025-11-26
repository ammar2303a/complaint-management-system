import express from "express"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/create", async (req, res) =>{
    const {name, email, password,phone} = req.body;
    const hashed = await bcrypt.hash(password, 10)
    const saveAuth = new User({name, email, password:hashed, phone})
    await saveAuth.save()
    res.status(201).send("user registered")
})

router.post("/login", async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if (!user) {
        res.status(400).send('User Not Found')
    }

    const passmatch = bcrypt.compare(password, user.password)
    if(!passmatch){
        res.status(400).send('Invalid Credentias')
    }

    const token = jwt.sign({userId: user._id, isAdmin: user.isAdmin}, process.env.SECRET_KEY, {expiresIn: "1h"})
    res.json({token, user:{
        id: user._id,
        name:user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        role: user.role
    }})

})

 router.get("/", async(req,res)=>{
        const getuser = await User.find()
        res.json(getuser)
    })

    router.put("/:id", async (req,res)=>{
        const {id} = req.params;
        const updateuser = await User.findByIdAndUpdate(id, req.body, {new:true})
       res.json(updateuser)
    })

    router.delete("/:comptid", async (req,res) =>{
        const {id} = req.params;
        await User.findByIdAndDelete(id)
        res.json({message: 'User deleted successfully' })
    })

    // Get only users with role 'worker'
router.get("/workers", async (req, res) => {
  try {
    const workers = await User.find({ role: "worker" }); // filter by role
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router