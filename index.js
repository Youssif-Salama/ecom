import express from "express";
import { bootstrap } from "./src/bootstrap/bootstrap.js";
const app = express();
bootstrap(app);