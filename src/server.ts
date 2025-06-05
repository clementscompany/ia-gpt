import express from "express";
import Route from "./routes/Bot.route";

const App = express();
const port : number = 3303;
App.use(Route);
App.listen(port, ()=> {console.log("http://localhost:"+port) })