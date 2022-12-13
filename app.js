const express = require('express');
const bodyParser = require('body-parser');
const mongoose =require("mongoose")

const router =require('./routes/router');

const hostname = "localhost";
 const port = "6464";


 const app = express(); 
 app.use(bodyParser.json());
 app.use((req, res ,next )=>{
    res.setHeader('access-control-allow-origin','*');
    res.setHeader('access-control-allow-methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('access-control-allow-headers','Content-type,Authorization');
    next();


 })
 app.use('/', router);
mongoose.connect("mongodb://127.0.0.1:27017/restaurant",
{useNewUrlParser:true , useUnifiedTopology :true}
).then(clint =>{
   app.listen(port,hostname, ()=>{
      console.log(`serveris running on http://${hostname}:${port}`);
   })
}).catch(err =>{
   console.log(err);
})