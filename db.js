const mongoose = require('mongoose');
require('dotenv').config();

// defining the mongoDB connection URL


const mongoURL=  process.env.local_DB_URL;
//const mongoURL = process.env.Online_DB_URL;

// set up MongoDB connection 


mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const db= mongoose.connection;

db.on('connected',()=>{
    console.log('connection established to mongoDB');
})

db.on('error', (err)=>{
    console.log('error found:',err);
})

db.on('disconnected',()=>{
    console.log('disconnected to mongoDB');
})

// export the database connection

module.exports=db;