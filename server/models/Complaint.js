import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    complaintphone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    complaintText: {
      type: String,
      required: true,
    },
    
     model: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Product
    ref: "Products", // Model name of Product
    required: true
  },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("complaints", ComplaintSchema);
