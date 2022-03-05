import mongoose from "mongoose";

const schemma = new mongoose.Schema({
  unique_visits: {
    type: Number,
    required: true,
    default: 0
  },
  total_visits: {
    type: Number,
    required: true,
    default: 0
  }
});

export default mongoose.model("Visits", schemma);