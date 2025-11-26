import express from "express"
import Product from "../models/Product.js"

const router = express.Router();

router.post("/create", async (req,res) =>{
    const {model, name, price, quantity} = req.body;

    const prodSave = new Product({model,name,price,quantity})

    await prodSave.save()
    res.status(201).send("Product inserted")
})

router.get("/", async (req, res)=>{
    const getProduct = await Product.find();
    res.json(getProduct) 
})

router.delete("/:id", async (req,res)=>{
    const {id} = req.params;
    await Product.findByIdAndDelete(id)
    res.json({message: 'Product deleted successfully' })
})
export default router