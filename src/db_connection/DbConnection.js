import mongoose from "mongoose";
import env from "dotenv";
env.config();
export const dbConnection = mongoose.connect(process.env.DBHOST + process.env.DBNAME);