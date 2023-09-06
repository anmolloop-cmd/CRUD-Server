const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const cors = require('cors');


const port=process.env.PORT||5001;
const DB=process.env.DB;

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cors())

function connectDB(){
    try{
        mongoose.connect(DB,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connection Successfully Established with Database')
    }
    catch(err)
    {
    console.log(err);
    process.exit(1);
    }
}
connectDB();

//routes
const routes=require('./routes/routes.js')
app.use('/',routes);



//listening
app.listen(port,()=>{
    try{
        console.log(`Server running on ${port}`)
    }
    catch(err)
    {
        console.log(err);
    }
})


