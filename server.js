// import
import express from 'express';
import mongoose from 'mongoose'
import Messages from './dbMessages.js';
import cors from "cors";

// app config
const app= express();
const port =process.env.PORT || 9000



// middleware
app.use(express.json());
app.use(cors());


// db config
const connection_url='mongodb+srv://admin:a9ecICZuN5zipvVS@cluster0.goejq.mongodb.net/amazdb?retryWrites=true&w=majority';
mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.once("once",()=>{
    console.log("DB Connected");
})

// api routes
app.get('/',(req,res)=> res.status(200).send('welcome our site'));
app.get('/api/v1/messages/sync',(req,res)=>{
    Messages.find((err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

app.post('/api/v1/messages/new',(req,res)=>{
    const dbMessage= req.body
    Messages.create(dbMessage, (err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

// listen

app.listen(port,()=>console.log(`Listening on localhost: ${port}`));

// a9ecICZuN5zipvVS