import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import checkingRouter from "./routes/checking.js";
import connectDB from "./config/db.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
connectDB()

//routes
app.use("/api", checkingRouter); //this is for checking only

app.get("/", (req, res) => {
  res.send("Server running");
});

//tests

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
