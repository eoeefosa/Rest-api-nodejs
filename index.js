"use strict";
require(`dotenv`).config();

const express =require('express');
const mongoose= require('mongoose');
const mongoString =process.env.DATABASE_URL;
const localmongo=process.env.LOCALDB;

mongoose.connect(localmongo);
const database=mongoose.connection;

database.on(`error`, (error)=>{
    console.log(error);
})

database.once(`connected`, ()=>{
    console.log(`Database Connected`);
})
const app= express();

app.use(express.json());


const routes= require(`./routes/routes`);
app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
app.post('/help',(req, res)=>{
    res.send('Help page');
})

app.listen(3000,()=>{
    console.log(`server started as ${3000}`);
})



