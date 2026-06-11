import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import asignment_router from "./routes/assignments.js";
import checkingRouter from "./routes/checking.js";
import eventRouter from "./routes/eventRoute.js";
import noticeRouter from "./routes/notice_routes.js";
import authRouter from "./routes/auth_route.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

//routes
app.use("/api", checkingRouter); //this is for checking only
app.use("/api", asignment_router);
app.use("/api", eventRouter);
app.use("/api", noticeRouter);
app.use("/api", authRouter);
app.use("/", (req, res) => {
  res.send("Server running");
});

//tests

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
