import express from "express";
import morgan from "morgan";
import env from "dotenv";
env.config();
import { v2 as cloudinary } from 'cloudinary';
import { v1Router } from "../routers/v1.router.js"
import { dbConnection } from "../db_connection/DbConnection.js";
export function bootstrap(app) {
    const port = "10000";
    app.use(express.json());
    app.use("/api/v1/", v1Router)

    cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret
    });
    app.use(morgan("dev"));
    dbConnection.then(() => {
        app.use((error, req, res, next) => {
            const { message, status, stack } = error;
            console.log(stack)
            res.status(status || 500).json({ message })
        })
        app.listen(port, () => {
            console.log({ "DataBase": "connected", "server": `listening on port: ${port}` })
        })
    })
}