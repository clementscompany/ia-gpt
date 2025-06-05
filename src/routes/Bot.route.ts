import express, { urlencoded } from "express";
import { Bot } from "../services/bot.service";
import cors from "cors";


const GPT = new Bot();
const Route = express.Router();
Route.use(express.json());
Route.use(urlencoded({extended:true}));
Route.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

Route.post("/message", GPT.GetMessage)

export default Route;