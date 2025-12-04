import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

export default app;
