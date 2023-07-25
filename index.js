import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import bootstrap from "./src/index.router.js";
const app=express()
const port = 5000


bootstrap(app,express)
app.listen(port,()=> console.log(`App is work on port ${port}`))