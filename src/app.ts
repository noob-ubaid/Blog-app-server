import express, { Application } from "express";

const app: Application = express();


app.use('/',async(req,res)=>{
    res.send('Hello World')
})
export default app;
