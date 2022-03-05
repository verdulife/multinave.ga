import mongoose from "mongoose";

const MONGODB_URI = `mongodb+srv://${import.meta.env.VITE_DB_USER}:${import.meta.env.VITE_DB_PASS}@frontpad-cluster.f3nsl.mongodb.net/analytics?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));
