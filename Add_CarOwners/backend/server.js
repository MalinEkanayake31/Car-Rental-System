import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/FeedbackRoute.js"; 
// Ensure the path and extension are correct
import path from "path";

dotenv.config();

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 8050;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb Connection success!");
});

app.use("/api", router);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) =>{
  req.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
}
);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error("Error:", err); // Log the error details
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port number : ${PORT}`);
});
