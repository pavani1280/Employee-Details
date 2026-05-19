import exp from "express";
import { connect } from "mongoose";
import { employeeApp } from "./API/empApp.js";
import cors from "cors";
import { config } from "dotenv";
config();

const app = exp();
const port = process.env.PORT || 4000;
//add cors middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);
//body parser middleware
app.use(exp.json());
//emp api middleware
app.use("/employee-api", employeeApp);

//DB connection
const connectDB = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error("DB_URL is not configured in environment variables.");
    }
    await connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("DB connected");
    app.listen(port, () => console.log(`server listening on port ${port}..`));
  } catch (err) {
    console.log("err in DB connection", err.message);
  }
};

connectDB();

//error handling middleware
app.use((err, req, res, next) => {
  console.log("err in middleware:", err.message);

  res.status(err.status || 500).json({
    message: "error",
    reason: err.message,
  });
});