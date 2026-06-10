import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import asignment_router from "./routes/assignments.js";
import checkingRouter from "./routes/checking.js";
import eventRouter from "./routes/eventRoute.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

//routes
app.use("/api", checkingRouter); //this is for checking only
app.use("/api", asignment_router);
app.use("/api", eventRouter);
app.use("/", (req, res) => {
  res.send("Server running");
});

//tests

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
