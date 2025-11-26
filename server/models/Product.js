import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
     model: { type: String, required: true },
      name: { type: String, required: true },
       price: { type: Number, required: true },
       quantity: { type: Number, required: true },
})

export default mongoose.model("Products", ProductSchema)