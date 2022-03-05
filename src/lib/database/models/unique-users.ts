import mongoose from "mongoose";

const schemma = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.model("UniqueUsers", schemma);