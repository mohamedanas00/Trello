import express from "express";
import bootstrap from "./src/index.router";
const app=express()
const port = 5000

bootstrap(app,express)
app.listen(port,()=>{`App is work on port ${port}`})